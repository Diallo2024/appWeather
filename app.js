// app.js
document.getElementById('weatherForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Capturar los valores de los inputs
    const city = document.getElementById('city').value;
    const country = document.getElementById('country').value;

    // My API key de OpenWeatherMap
    const apiKey = '0435928760ad7dfaf95577f0894f8eb0';

    try {
        // Llama a la API para obtener el clima
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric&lang=es`);
        
        if (!response.ok) {
            throw new Error('Error al obtener los datos del clima.');
        }

        const data = await response.json();

        // Desglose de los datos de la response
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        // URL de la bandera usando el código del país
        const flagUrl = `https://flagcdn.com/80x60/${country.toLowerCase()}.png`;

        // Para mostrar Muestra los resultados en la página
        document.getElementById('weatherResult').innerHTML = `
            <h2 class="text-xl font-bold mb-2">Clima en ${data.name}, ${data.sys.country}</h2>
            <p class="text-lg">Temperatura: ${temperature}°C</p>
            <p class="text-lg">Descripción: ${description}</p>
            <p class="text-lg">Humedad: ${humidity}%</p>
            <p class="text-lg">Velocidad del Viento: ${windSpeed} m/s</p>
        `;
    } catch (error) {
        document.getElementById('weatherResult').innerHTML = `<p class="text-red-500">${error.message}</p>`;
    }
});
