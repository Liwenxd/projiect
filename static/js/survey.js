const models = [
    {name: '通义千问', company: '阿里', icon: '/static/icons/tongyi.png'},
    {name: '豆包', company: '字节跳动', icon: '/static/icons/douyin.png'},
    // ... 其他模型数据
];

// 加载选项
const optionsContainer = document.querySelector('.model-options');
models.forEach(model => {
    const div = document.createElement('div');
    div.className = 'model-option';
    div.innerHTML = `
        <input type="checkbox" id="${model.name}" name="models" value="${model.name}">
        <img src="${model.icon}" class="model-icon">
        <label for="${model.name}">${model.name}（${model.company}）</label>
    `;
    optionsContainer.appendChild(div);
});

// 表单提交处理
document.getElementById('surveyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 获取选中的模型
    const selectedModels = Array.from(document.querySelectorAll('input[name="models"]:checked'))
        .map(checkbox => checkbox.value);
    
    if (selectedModels.length === 0) {
        alert('请至少选择一个AI模型');
        return;
    }

    // 提交数据
    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            models: selectedModels,
            openid: 'test_user' // 在实际微信环境中，这里应该是真实的openid
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            // 显示感谢页面
            window.location.href = '/thanks';
        } else {
            alert(data.message || '提交失败，请稍后重试');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('提交失败，请稍后重试');
    });
}); 