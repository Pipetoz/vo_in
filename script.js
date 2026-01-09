// Проверка поддержки Web Speech API
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    alert("Ваш браузер не поддерживает Web Speech API. Попробуйте использовать Chrome или Edge.");
}

// Инициализация распознавания речи
const recognition = new SpeechRecognition();
recognition.continuous = true; // Непрерывное распознавание
recognition.interimResults = true; // Промежуточные результаты
recognition.lang = 'ru-RU'; // Язык распознавания

// Элементы интерфейса
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const sendBtn = document.getElementById('sendBtn');
const output = document.getElementById('output');
const status = document.getElementById('status');

// Обработчики событий для кнопок
startBtn.addEventListener('click', startRecording);
stopBtn.addEventListener('click', stopRecording);
sendBtn.addEventListener('click', sendToChat);

// Функция начала записи
function startRecording() {
    try {
        recognition.start();
        startBtn.disabled = true;
        stopBtn.disabled = false;
        status.textContent = 'Запись активна... Говорите';
        status.style.color = 'green';
    } catch (error) {
        console.error('Ошибка при начале записи:', error);
        status.textContent = 'Ошибка при начале записи';
        status.style.color = 'red';
    }
}

// Функция остановки записи
function stopRecording() {
    recognition.stop();
    startBtn.disabled = false;
    stopBtn.disabled = true;
    status.textContent = 'Запись остановлена';
    status.style.color = 'black';
}

// Функция отправки текста в чат
function sendToChat() {
    const text = output.value.trim();
    
    if (text) {
        // Здесь будет логика отправки текста в чат
        // Пока просто покажем alert с текстом
        alert('Текст для отправки в чат:

' + text);
        
        // В реальной реализации здесь будет код для отправки текста в чат
        // Например:
        // fetch('/api/send-message', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ message: text })
        // })
        
        console.log('Отправка в чат:', text);
    } else {
        alert('Нет текста для отправки');
    }
}

// Обработчик результатов распознавания
recognition.onresult = function(event) {
    let interimTranscript = '';
    let finalTranscript = '';
    
    // Обработка промежуточных и финальных результатов
    for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        
        if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
        } else {
            interimTranscript += transcript;
        }
    }
    
    // Обновление текстового поля
    output.value = finalTranscript + interimTranscript;
    
    // Прокрутка вниз
    output.scrollTop = output.scrollHeight;
};

// Обработчик ошибок
recognition.onerror = function(event) {
    console.error('Ошибка распознавания речи:', event.error);
    status.textContent = 'Ошибка: ' + event.error;
    status.style.color = 'red';
    startBtn.disabled = false;
    stopBtn.disabled = true;
};

// Обработчик завершения распознавания
recognition.onend = function() {
    status.textContent = 'Распознавание завершено';
    startBtn.disabled = false;
    stopBtn.disabled = true;
};
