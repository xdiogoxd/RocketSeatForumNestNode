import { Encrypter } from '@/domain/forum/application/cryptography/encrypter';
import { Module } from '@nestjs/common';
import { JwtEncrypter } from './jwt-encryptor';
import { HashComparer } from '@/domain/forum/application/cryptography/hash-comparer';
import { BcryptHahser } from './bcript-hasher';
import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator';

@Module({
  providers: [
    {
      provide: Encrypter,
      useClass: JwtEncrypter,
    },
    {
      provide: HashComparer,
      useClass: BcryptHahser,
    },
    {
      provide: HashGenerator,
      useClass: BcryptHahser,
    },
  ],
  exports: [Encrypter, HashComparer, HashGenerator],
})
export class CryptographyModule {}
