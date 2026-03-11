import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class SoopService {
  constructor(private readonly httpService: HttpService) {}
}
