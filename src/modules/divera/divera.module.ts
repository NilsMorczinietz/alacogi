import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DiveraService } from './divera.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
    }),
  ],
  providers: [DiveraService],
  exports: [DiveraService],
})
export class DiveraModule {}
