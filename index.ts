import express, { Request, Response, NextFunction } from 'express';
import * as os from "os"
import * as fs from 'fs/promises';

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Timezones by location application is running on port ${port}.`);
});


type FileResponce = { 
  hostname: string
  content?: string
}

const getLocationsWithTimezones = async (request: Request, response: Response, next: NextFunction) => {
  console.log(request.url);
  
  const filepath = request.url.slice(1)
  try {
    const buffer = await fs.readFile(filepath)
    response.status(200).json(buffer.toLocaleString());
    console.log("file найден");
  
  } catch (error) {
    response.status(404).send("не нашли мы такой файл как " + filepath);
    
  }


};

app.get('/*', getLocationsWithTimezones);