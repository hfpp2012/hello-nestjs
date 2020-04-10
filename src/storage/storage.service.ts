import { FileUpload } from 'graphql-upload';
import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { checksumFile } from '../utils/checksumFile';
import OSS from 'ali-oss';
import config from '../config/configuration';

@Injectable()
export class StorageService {
  async fileUpload({
    filename,
    createReadStream,
  }: FileUpload): Promise<String> {
    const ext = filename.match(/\.[a-z]+$/);

    const md5Filename = await checksumFile('md5', createReadStream);

    return new Promise((resolve, reject) => {
      createReadStream()
        .pipe(
          createWriteStream(
            __dirname + `/../../client/upload/${md5Filename}${ext}`,
          ),
        )
        .on('finish', () => resolve(`/upload/${md5Filename}${ext}`))
        .on('error', () => reject(false));
    });
  }

  async aliyunFileUpload({
    filename,
    createReadStream,
  }: FileUpload): Promise<String> {
    const ext = filename.match(/\.[a-z]+$/);

    const md5Filename = await checksumFile('md5', createReadStream);

    const client = new OSS({
      region: config.aliyun.oss.region,
      accessKeyId: config.aliyun.oss.accessKeyId!,
      accessKeySecret: config.aliyun.oss.accessKeySecret!,
      bucket: config.aliyun.oss.bucket,
    });

    const result: any = await client.put(
      `upload_images/${md5Filename}${ext}`,
      createReadStream(),
    );
    return result.url;
  }
}
