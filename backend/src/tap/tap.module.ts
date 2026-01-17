import { Module } from '@nestjs/common';
import { TapController } from './tap.controller';

@Module({
  controllers: [TapController],
})
export class TapModule {}
