from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import qrcode
import io
import base64
from datetime import datetime
import os

app = Flask(__name__)

# 使用SQLite数据库
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'survey.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# 模型定义
class UserSubmission(db.Model):
    __tablename__ = 'user_submissions'
    id = db.Column(db.Integer, primary_key=True)
    wx_openid = db.Column(db.String(100), unique=True)
    submit_time = db.Column(db.DateTime, default=datetime.utcnow)
    selections = db.relationship('ModelSelection', backref='submission', lazy=True)

class ModelSelection(db.Model):
    __tablename__ = 'model_selections'
    id = db.Column(db.Integer, primary_key=True)
    user_submission_id = db.Column(db.Integer, db.ForeignKey('user_submissions.id'))
    model_name = db.Column(db.String(50))

@app.route('/')
def index():
    """数据大屏展示页面"""
    return render_template('dashboard.html')

@app.route('/qrcode')
def qrcode():
    """二维码展示页面"""
    # 生成问卷的URL二维码
    qr = qrcode.QRCode(version=1, box_size=10, border=5)
    qr.add_data(request.host_url + 'survey')
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    
    # 转换二维码为base64
    buffered = io.BytesIO()
    img.save(buffered, format="PNG")
    qr_code = base64.b64encode(buffered.getvalue()).decode()
    
    return render_template('qrcode.html', qr_code=qr_code)

@app.route('/survey')
def survey():
    return render_template('survey.html')

@app.route('/submit', methods=['POST'])
def submit():
    data = request.json
    wx_openid = data.get('openid')
    selected_models = data.get('models', [])
    
    # 检查是否已提交
    if UserSubmission.query.filter_by(wx_openid=wx_openid).first():
        return jsonify({'status': 'error', 'message': '您已经提交过问卷了'})
    
    # 创建新提交
    submission = UserSubmission(wx_openid=wx_openid)
    db.session.add(submission)
    
    # 添加选择的模型
    for model in selected_models:
        selection = ModelSelection(submission=submission, model_name=model)
        db.session.add(selection)
    
    db.session.commit()
    return jsonify({'status': 'success'})

@app.route('/stats')
def get_stats():
    # 获取统计数据
    stats = db.session.query(
        ModelSelection.model_name,
        db.func.count(ModelSelection.id)
    ).group_by(ModelSelection.model_name).all()
    
    # 获取最近5条提交
    recent = db.session.query(
        UserSubmission.submit_time,
        db.func.group_concat(ModelSelection.model_name)
    ).join(ModelSelection).group_by(UserSubmission.id).order_by(
        UserSubmission.submit_time.desc()
    ).limit(5).all()
    
    return jsonify({
        'stats': dict(stats),
        'recent': [
            {
                'time': r[0].strftime('%Y-%m-%d %H:%M:%S'),
                'models': r[1].split(',')
            } for r in recent
        ]
    })

@app.route('/thanks')
def thanks():
    """提交成功后的感谢页面"""
    return render_template('thanks.html')

# 添加数据库初始化
@app.before_first_request
def create_tables():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True) 