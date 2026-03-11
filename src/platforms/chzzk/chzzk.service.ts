import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ChzzkService {
  constructor(private readonly httpService: HttpService) {}
}
