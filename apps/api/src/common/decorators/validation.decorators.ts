import { applyDecorators } from '@nestjs/common';
import { IsString, MaxLength } from 'class-validator';

const SHORT_STRING_MAX_LENGTH = 255;

export function IsShortString(max = SHORT_STRING_MAX_LENGTH) {
  return applyDecorators(
    IsString() as PropertyDecorator,
    MaxLength(max) as PropertyDecorator,
  );
}
