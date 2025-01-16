let statsChart = echarts.init(document.getElementById('statsChart'));
let trendChart = echarts.init(document.getElementById('trendChart'));

// 存储趋势数据
let trendData = {
    times: [],
    counts: {}
};

function updateStats() {
    fetch('/stats')
        .then(response => response.json())
        .then(data => {
            // 更新总计数据
            const totalSubmissions = data.recent.length;
            const totalSelections = Object.values(data.stats).reduce((a, b) => a + b, 0);
            document.getElementById('totalSubmissions').textContent = totalSubmissions;
            document.getElementById('totalSelections').textContent = totalSelections;

            // 更新柱状图
            const statsOption = {
                backgroundColor: 'transparent',
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: Object.keys(data.stats),
                    axisLabel: {
                        color: '#fff',
                        rotate: 45
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        color: '#fff'
                    }
                },
                series: [{
                    data: Object.values(data.stats),
                    type: 'bar',
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {offset: 0, color: '#00f2fe'},
                            {offset: 1, color: '#0051fe'}
                        ])
                    }
                }]
            };
            statsChart.setOption(statsOption);

            // 更新趋势图
            const currentTime = new Date().toLocaleTimeString();
            trendData.times.push(currentTime);
            if (trendData.times.length > 10) {
                trendData.times.shift();
            }

            Object.keys(data.stats).forEach(model => {
                if (!trendData.counts[model]) {
                    trendData.counts[model] = [];
                }
                trendData.counts[model].push(data.stats[model] || 0);
                if (trendData.counts[model].length > 10) {
                    trendData.counts[model].shift();
                }
            });

            const trendOption = {
                backgroundColor: 'transparent',
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: Object.keys(data.stats),
                    textStyle: {
                        color: '#fff'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: trendData.times,
                    axisLabel: {
                        color: '#fff'
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        color: '#fff'
                    }
                },
                series: Object.keys(data.stats).map(model => ({
                    name: model,
                    type: 'line',
                    data: trendData.counts[model],
                    smooth: true
                }))
            };
            trendChart.setOption(trendOption);

            // 更新最近提交记录
            const recentHtml = data.recent.map(item => `
                <div class="submission-item new-submission">
                    <div style="color: #00f2fe">${item.time}</div>
                    <div>选择模型：${item.models.join('、')}</div>
                </div>
            `).join('');
            document.getElementById('recentSubmissions').innerHTML = recentHtml;
        });
}

// 初始更新和定时更新
updateStats();
setInterval(updateStats, 5000);

// 窗口大小改变时重绘图表
window.addEventListener('resize', () => {
    statsChart.resize();
    trendChart.resize();
}); 