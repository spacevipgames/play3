const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.get('/download', async (req, res) => {
    const fileUrl = "https://dn720202.ca.archive.org/0/items/sony_playstation3_b_part1/Back%20to%20the%20Future%20-%20The%20Game%20%28Europe%29%20%28En%2CFr%2CDe%29.iso";
    const cookies = "donation-identifier=cf2df63433c94029107b4d8c98de722b; "
        + "view-search=tiles; showdetails-search=; "
        + "abtest-identifier=237063cb5b53d6175c282df626d055dd; "
        + "test-cookie=1; logged-in-sig=1774073859%201742537859%20jcq%2FrZTsTrxInzMQegPMat4yfr7VwXbD5yl34WYjExz3arRTsqpWapAbX9FfhrfnhU1xSV%2FPVG2EJJ8K7Sd9ZITysxJUAR8KklDqSD2Q0gsHBZkNwI0m4tvOxm6uIZKr6ELYhABHqRjUEJKK10V%2BO2hxXKr2DCOb5JtOXc6nlot%2F6k8%2FN0%2F9KXTMt6qktp1i4F0kAbfsDdru8lIXUCmn%2FdoCXA0o8fZFr8HtfxjpeYKSjV8xFiPpV7EJFGM%2BBqwBgKdomrYHZ8i0F5qW5ArV47tWUaIlvq%2F%2F0AdB%2FYp%2Bqo9toRhcFBCCj%2BlF17km9CH%2FZ3Ry6f6%2Bsg2ryFE3dFDzGQ%3D%3D; "
        + "logged-in-user=estabiomarcos740%40gmail.com; "
        + "donation=x";

    const fileName = 'Back_to_the_Future_The_Game_Europe.iso';
    
    try {
        const response = await axios.get(fileUrl, {
            headers: {
                'Cookie': cookies,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0'
            },
            responseType: 'stream',
        });

        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        res.setHeader('Content-Type', 'application/octet-stream');
        response.data.pipe(res);

    } catch (error) {
        console.error('Error downloading file', error);
        res.status(500).send('Error downloading file');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
