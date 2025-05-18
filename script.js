document.addEventListener('DOMContentLoaded', () => {
    // 初始化页面元素
    const container = document.querySelector('.container');
    const heartContainer = document.getElementById('heart-container');
    const floatingTextContainer = document.querySelector('.floating-text-container');
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    const addMoreTextBtn = document.getElementById('add-more-text');
    const greetingMessageElement = document.querySelector('.greeting-message');
    
    // 是否正在播放音乐
    let isMusicPlaying = false;
    
    // 更新祝福语
    greetingMessageElement.innerHTML = `💖 致 梦月 💖<br>520快乐，💗i love you💗！`;
    
    // 创建爱心形状
    createHeartShape();
    
    // 初始生成飘动文字和其他装饰物
    for (let i = 0; i < 100; i++) { // 调整数量避免过多导致性能问题
        createFloatingText();
    }
    
    // 添加装饰性小爱心
    createDecorationHearts();
    
    // 添加背景气球、星星等元素
    createFloatingDecorations();
    
    // 让中心爱心开始随机飘动
    startRandomHeartMovement();
    
    // 添加更多飘动文字的按钮
    addMoreTextBtn.addEventListener('click', () => {
        for (let i = 0; i < 5; i++) {
            createFloatingText();
        }
        // 点击时添加一些爱心特效
        createHeartBurst();
    });
    
    // 音乐控制按钮
    musicToggle.addEventListener('click', () => {
        const musicPrompt = document.getElementById('music-prompt');
        if (isMusicPlaying) {
            backgroundMusic.pause();
            musicToggle.textContent = '♫ 播放音乐';
            if(musicPrompt) musicPrompt.style.opacity = '1'; // 暂停时重新显示提示
        } else {
            backgroundMusic.play().catch(error => {
                console.error('音乐播放失败:', error);
                // 可以在这里提示用户音乐播放失败
            });
            musicToggle.textContent = '♫ 暂停音乐';
            if(musicPrompt) musicPrompt.style.opacity = '0'; // 播放时隐藏提示
        }
        isMusicPlaying = !isMusicPlaying;
    });
    
    // 让爱心随机移动
    function startRandomHeartMovement() {
        const heart = heartContainer;
        let startTime = Date.now();
        
        function moveHeart() {
            const now = Date.now();
            const elapsed = now - startTime;
            
            // 生成随机移动量
            const offsetX = Math.sin(elapsed / 2000) * 10; // 横向移动量
            const offsetY = Math.sin(elapsed / 1500) * 8;  // 纵向移动量
            const rotation = Math.sin(elapsed / 3000) * 3; // 旋转量
            
            // 设置爱心位置
            heart.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) rotate(${rotation}deg)`;
            
            requestAnimationFrame(moveHeart);
        }
        
        requestAnimationFrame(moveHeart);
    }
    
    // 创建爱心形状函数
    function createHeartShape() {
        // 爱心的参数方程坐标点
        const heartPoints = [];
        const outlineText = 'I love you'; // 爱心轮廓文字
        const numPoints = 100; // 进一步减少点数，让轮廓文字更清晰，避免过于杂乱
        const scale = 13; // 稍微调整大小
        
        for (let i = 0; i < numPoints; i++) {
            // 参数方程生成心形坐标
            const t = i / numPoints * 2 * Math.PI;
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
            
            // 缩放并翻转（因为CSS中Y轴向下）
            heartPoints.push({
                x: x * scale,
                y: -y * scale
            });
        }
        
        // 创建文本元素
        for (let i = 0; i < heartPoints.length; i++) {
            const textElement = document.createElement('div');
            textElement.className = 'heart-text';
            textElement.textContent = outlineText;
            textElement.style.left = `${heartPoints[i].x}px`;
            textElement.style.top = `${heartPoints[i].y}px`;
            
            // 固定颜色，使视觉效果更统一
            textElement.style.color = `#ff5e94`;
            
            // 使大小更均匀
            const size = 9 + Math.random() * 4; // 调整字体大小范围，使其更精致
            textElement.style.fontSize = `${size}px`;
            
            // 添加闪烁动画
            textElement.style.animation = `heartbeat ${1.2 + Math.random() * 1.5}s infinite alternate`;
            textElement.style.animationDelay = `${Math.random() * 1.5}s`;
            
            heartContainer.appendChild(textElement);
        }
        
        // 在爱心中心添加一个特殊文本
        const centerText = document.createElement('div');
        centerText.className = 'heart-center-text';
        centerText.innerHTML = '梦月<br>💗i love you💗'; // 使用innerHTML以支持<br>
        heartContainer.appendChild(centerText);
    }
    
    // 创建飘动文字函数
    function createFloatingText() {
        const text = document.createElement('div');
        text.className = 'floating-text';
        text.textContent = '💗 I love you 💗'; // 恢复背景飘动文字
        
        // 随机位置
        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight + 50;
        
        // 随机大小
        const size = 12 + Math.random() * 12;
        
        // 随机颜色范围（粉色系）
        const randomHue = 330 + Math.random() * 30;
        const opacity = 0.3 + Math.random() * 0.5;
        
        // 设置样式
        text.style.left = `${startX}px`;
        text.style.top = `${startY}px`;
        text.style.fontSize = `${size}px`;
        text.style.color = `hsl(${randomHue}, 100%, 70%)`;
        text.style.opacity = `${opacity}`;
        
        // 添加到容器
        floatingTextContainer.appendChild(text);
        
        // 动画时间
        const animationDuration = 10 + Math.random() * 15;
        
        // 上升速度
        let startTime = null;
        let previousTimestamp = null;
        
        function animate(timestamp) {
            if (!startTime) startTime = timestamp;
            if (!previousTimestamp) previousTimestamp = timestamp;
            
            const elapsed = timestamp - startTime;
            const deltaTime = timestamp - previousTimestamp;
            
            // 计算当前位置
            const currentY = startY - (elapsed / animationDuration / 1000 * window.innerHeight * 1.2);
            text.style.top = `${currentY}px`;
            
            // 计算透明度
            const progress = elapsed / (animationDuration * 1000);
            if (progress < 0.3) {
                text.style.opacity = opacity * (progress / 0.3);
            } else if (progress > 0.7) {
                text.style.opacity = opacity * (1 - (progress - 0.7) / 0.3);
            } else {
                text.style.opacity = opacity;
            }
            
            previousTimestamp = timestamp;
            
            // 如果元素还在屏幕内，继续动画
            if (currentY > -100) {
                requestAnimationFrame(animate);
            } else {
                // 移除元素
                text.remove();
                // 随机决定是否生成新的飘动文字
                if (Math.random() < 0.8) {
                    createFloatingText();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // 创建装饰性小爱心
    function createDecorationHearts() {
        const heartSymbols = ['❤️', '💕', '💖', '💘', '💝', '💗'];
        
        // 减少装饰心数量
        for (let i = 0; i < 8; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart-decoration';
            heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            
            // 随机位置和动画
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.bottom = `-50px`;
            heart.style.animationDuration = `${12 + Math.random() * 10}s`;
            heart.style.animationDelay = `${Math.random() * 8}s`;
            
            document.body.appendChild(heart);
        }
    }
    
    // 创建新的浮动装饰（星星、气球）
    function createFloatingDecorations() {
        // 装饰元素类型
        const decorations = [
            '🌟', '⭐', '✨', '🎈', '🎀', '🌸', '🌹', 
        ];
        
        // 创建25个随机装饰物
        for (let i = 0; i < 25; i++) {
            const decoration = document.createElement('div');
            decoration.className = 'floating-decoration';
            
            // 随机选择装饰物类型
            const decorType = decorations[Math.floor(Math.random() * decorations.length)];
            decoration.textContent = decorType;
            
            // 随机初始位置
            const startX = Math.random() * window.innerWidth;
            decoration.style.left = `${startX}px`;
            decoration.style.bottom = `-50px`;
            
            // 随机大小
            const size = 15 + Math.random() * 25;
            decoration.style.fontSize = `${size}px`;
            
            // 随机动画时间和延迟
            const duration = 15 + Math.random() * 20;
            decoration.style.animationDuration = `${duration}s`;
            decoration.style.animationDelay = `${Math.random() * 10}s`;
            
            // 随机水平偏移量
            const driftAmount = Math.random() * 100 - 50; // -50px 到 +50px
            decoration.style.setProperty('--drift-x', `${driftAmount}px`);
            
            document.body.appendChild(decoration);
            
            // 动画结束后再次创建（保持数量）
            decoration.addEventListener('animationend', function() {
                this.remove();
                createSingleDecoration();
            });
        }
    }
    
    // 创建单个装饰物
    function createSingleDecoration() {
        const decorations = [
            '🌟', '⭐', '✨', '🎈', '🎀', '🌸', '🌹', '🍀', '🎵', '🎶', '🦋', '🌈'
        ];
        
        const decoration = document.createElement('div');
        decoration.className = 'floating-decoration';
        
        // 随机选择装饰物类型
        const decorType = decorations[Math.floor(Math.random() * decorations.length)];
        decoration.textContent = decorType;
        
        // 随机初始位置
        const startX = Math.random() * window.innerWidth;
        decoration.style.left = `${startX}px`;
        decoration.style.bottom = `-50px`;
        
        // 随机大小
        const size = 15 + Math.random() * 25;
        decoration.style.fontSize = `${size}px`;
        
        // 随机动画时间和延迟
        const duration = 15 + Math.random() * 20;
        decoration.style.animationDuration = `${duration}s`;
        
        // 随机水平偏移量
        const driftAmount = Math.random() * 100 - 50; // -50px 到 +50px
        decoration.style.setProperty('--drift-x', `${driftAmount}px`);
        
        document.body.appendChild(decoration);
        
        // 动画结束后再次创建（保持数量）
        decoration.addEventListener('animationend', function() {
            this.remove();
            createSingleDecoration();
        });
    }
    
    // 点击按钮时产生爱心爆发效果
    function createHeartBurst() {
        const burstCount = 10;
        const heartSymbols = ['❤️', '💕', '💖', '💘', '💝', '💗'];
        
        for (let i = 0; i < burstCount; i++) {
            const heart = document.createElement('div');
            heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            heart.style.position = 'fixed';
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.fontSize = `${16 + Math.random() * 20}px`;
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '100';
            
            // 随机角度和距离
            const angle = Math.random() * Math.PI * 2;
            const distance = 100 + Math.random() * 150;
            const duration = 1 + Math.random() * 2;
            
            // 创建动画
            heart.style.transition = `all ${duration}s ease-out`;
            
            document.body.appendChild(heart);
            
            // 强制重绘
            heart.getBoundingClientRect();
            
            // 设置最终位置和透明度
            heart.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
            heart.style.opacity = '0';
            
            // 动画结束后移除元素
            setTimeout(() => {
                heart.remove();
            }, duration * 1000);
        }
    }
    
    // 打乱数组顺序的函数
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    // 检测设备宽度，实现响应式调整
    function checkDeviceWidth() {
        const width = window.innerWidth;
        const heartScale = width < 768 ? (width / 768) * 0.8 : 1; // 移动端缩小
        
        // 设置爱心容器大小
        heartContainer.style.transform = `translate(-50%, -50%) scale(${heartScale})`;
    }
    
    // 初始检测设备宽度
    checkDeviceWidth();
    
    // 窗口大小变化时重新检测
    window.addEventListener('resize', checkDeviceWidth);
}); 