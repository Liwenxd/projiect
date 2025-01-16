CREATE TABLE ai_models (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    company VARCHAR(50),
    icon_url VARCHAR(2048)
);

-- 插入预设的AI模型数据，使用base64编码的图标
INSERT INTO ai_models (name, company, icon_url) VALUES 
    ('通义千问', '阿里', 'data:image/png;base64,...'),
    ('豆包', '字节跳动', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMyNEY2RjA7c3RvcC1vcGFjaXR5OjEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRjQwODg7c3RvcC1vcGFjaXR5OjEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcng9IjIwIiBmaWxsPSIjMDAwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iNDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSJ1cmwoI2cpIj7mipM8L3RleHQ+PC9zdmc+'),
    ('讯飞星火', '科大讯飞', 'data:image/png;base64,...'),
    ('文心一言', '百度', 'data:image/png;base64,...'),
    ('混元助手', '腾讯', 'data:image/png;base64,...'),
    ('紫东太初', '中科院', 'data:image/png;base64,...'),
    ('ChatGPT', 'OpenAI', 'data:image/png;base64,...'),
    ('Watsonx', 'IBM', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcng9IjIwIiBmaWxsPSIjMDUzNEJFIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMzUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSJ3aGl0ZSI+SUJNPC90ZXh0Pjwvc3ZnPg=='),
    ('Gemini', 'Google', 'data:image/png;base64,...'),
    ('SageMaker', 'Amazon', 'data:image/png;base64,...'),
    ('LLaMA', 'Meta', 'data:image/png;base64,...'),
    ('Sensei', 'Adobe', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcng9IjIwIiBmaWxsPSIjRkYwMEZGIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSJ3aGl0ZSI+U0VOU0VJPC90ZXh0Pjwvc3ZnPg==');

CREATE TABLE user_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    wx_openid VARCHAR(100) UNIQUE,
    submit_time DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE model_selections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_submission_id INT,
    model_name VARCHAR(50),
    FOREIGN KEY (user_submission_id) REFERENCES user_submissions(id)
); 