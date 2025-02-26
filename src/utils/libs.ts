/** @format */

import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import * as moment from 'moment';
import { extname } from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: `${process.cwd()}/.env` });

export const capitalize = ([first, ...rest]: string, lowerRest = false) =>
  first.toUpperCase() +
  (lowerRest ? rest.join("").toLowerCase() : rest.join(""));


export const genRefreshToken = async (n: number) => await bcrypt.genSaltSync(n);
export const genRefreshTokenWithTimestamp = async () => {
  const refreshToken = await genRefreshToken(8);
  const ts = moment().unix();
  return refreshToken + ts.toString();
};

export const hashRefreshToken = async (strRefresh: string) => {
  const ts = strRefresh.slice(-10);
  const RT_without_ts = strRefresh.slice(0, -10);
  const dataToHash = RT_without_ts + ts;
  const hash = crypto.createHash('sha256');
  hash.update(dataToHash);
  const hashedToken = hash.digest('hex');
  return hashedToken;
};

export const compareRefreshToken = async (strRefresh: string, hashToken: string) => {
  return strRefresh === hashToken;
};

export const generateCode = async (length: number) => {
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let randomCode = '';
  for (let i = 0; i < length; i++) {
    const randomIndex: number = Math.floor(Math.random() * characters.length);
    randomCode += characters.charAt(randomIndex);
  }
  return randomCode;
};

export const genPassword = async (str: string) => {
  return await bcrypt.hash(str, bcrypt.genSaltSync(8));
};

export const parsePaginate = paramsDto => {
  const limit = Number(paramsDto?.limit) || 10;
  const page = Number(paramsDto?.page) || 1;
  const latitude = Number(paramsDto?.latitude);
  const longitude = Number(paramsDto?.longitude);
  const thresholds = stringToArray(paramsDto?.thresholds);
  const search = String(paramsDto?.search || '');
  const id = paramsDto?.id;
  const orderBy = paramsDto?.orderBy;
  const duration = Number(paramsDto?.duration) || 1;

  const offset = Number(paramsDto?.offset) ? Number(paramsDto?.offset) : (page - 1) * limit;
  return {
    ...paramsDto,
    limit,
    page,
    offset,
    latitude,
    longitude,
    thresholds,
    search,
    duration,
    id,
    orderBy
  };
};

export const resJson = ({ data = [], message = '', status = 200 }) => {
  const success = status >= 200 && status < 300 ? true : false;
  return {
    data,
    message,
    status,
    success
  };
};

export const isQueryParam = async param => {
  if (param && param != undefined && param != '') {
    return true;
  }
  return false;
};

export const stringToArray = (value: string) => {
  let array = [];
  if (value) {
    const arrTmp = value.split(',');
    array = arrTmp?.map(str => {
      return Number(str);
    });
  }
  return array;
};

export const generateFilename = (req, file, cb) => {
  // Generating a 32 random chars long string
  const randomName = Array(32)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  //Calling the callback passing the random name generated with the original extension name
  cb(null, `${randomName}${extname(file.originalname)}`);
};

export const generateOtp = (numberDigit: number) => {
  let otp = '';
  for (let i = 0; i < numberDigit; i++) {
    otp += Math.floor(Math.random() * 10); // generating a random digit
  }
  return otp;
};

export const checkExpiredOTP = (targetTime: any) => {
  const timeTarget = new Date(targetTime).getTime();
  const currentTime = new Date().getTime();
  const timeDifference = currentTime - timeTarget;
  const maxTimeDifference = 5 * 60 * 1000;

  return timeDifference <= maxTimeDifference;
};

export function randomNumberString(length: number) {
  let text = '';
  const possible = '0123456789';

  for (let i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

export const makeRefCode = char => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < char) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

export const paginate = ({ count, limit }: { count: number; limit: number }) => {
  const totalPage = Math.ceil(count / limit);
  return { totalItem: count, totalPage };
};

export const genRand = (min = 0.7, max = 1) => {
  const rand = Math.random() * (max - min) + min;
  console.log('rand', rand);
  return Math.pow(1.1, rand);
};

export const getTimeByDuration = (duration: number, unit: 'd' | 'm' | 'y' = 'd') =>
  moment().subtract(+duration, unit);

export const durationTime = (duration: number) => {
  const currentDate = moment().subtract(+duration, 'd');
  return currentDate;
};

export const arrayNumberWeek = (day: number) => {
  const divisor = 7;
  const result = Math.floor(day / divisor); // Lấy phần nguyên của phép chia

  const array = [];
  for (let i = 1; i <= result; i++) {
    array.push(i * divisor);
  }
  return array;
};
