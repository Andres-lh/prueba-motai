import { Test } from '@nestjs/testing';
import request from 'supertest';
import * as dotenv from 'dotenv';

import { AppModule } from '../src/app.module';
import { UserService } from '../src/user/services/user.service';
import { NestExpressApplication } from '@nestjs/platform-express';
import { JwtService } from '@nestjs/jwt';
import { User } from '../src/user/entities/user.entity';
import { LoginResponseDto } from '../src/auth/dto/login.dto';
import { DataSource } from 'typeorm';
import { setupDatabase } from './config/ormconfig.e2e';

dotenv.config({ path: '.env.test' });

describe('Auth integration (e2e)', () => {
  let app: NestExpressApplication;
  let userService: UserService;
  let dataSource: DataSource;

  const testUser = {
    email: 'test@test.com',
    password: 'Password_123',
  };

  beforeAll(async () => {
    jest.setTimeout(30000);
    dataSource = await setupDatabase();

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(DataSource)
      .useValue(dataSource)
      .overrideProvider(JwtService)
      .useValue(
        new JwtService({
          secret: 'secret',
          signOptions: { expiresIn: '15m' },
        }),
      )
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();

    userService = moduleRef.get(UserService);

    await userService.create({
      email: testUser.email,
      password: testUser.password,
    });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should login user and return tokens', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send(testUser)
      .expect(201);

    expect(res.body).toHaveProperty('accessToken');
    expect(res.body).toHaveProperty('refreshToken');
  });

  it('should issue a valid access token', async () => {
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send(testUser);

    const { accessToken } = loginRes.body as LoginResponseDto;

    const jwtService = app.get(JwtService);
    const payload = jwtService.verify<{ sub: string }>(accessToken);

    expect(payload.sub).toBeDefined();
  });

  it('should refresh tokens', async () => {
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send(testUser);

    const { refreshToken } = loginRes.body as LoginResponseDto;

    const user = await userService.findByEmail(testUser.email);

    expectUser(user);

    const res = await request(app.getHttpServer())
      .post('/auth/refresh')
      .send({
        userId: user.id,
        refreshToken,
      })
      .expect(201);

    expect(res.body).toHaveProperty('accessToken');
    expect(res.body).toHaveProperty('refreshToken');
  });

  it('should logout user', async () => {
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send(testUser)
      .expect(201);

    const { accessToken } = loginRes.body as LoginResponseDto;

    await request(app.getHttpServer())
      .post('/auth/logout')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(201);
  });
});

function expectUser(user: User | null): asserts user is User {
  expect(user).not.toBeNull();
}
