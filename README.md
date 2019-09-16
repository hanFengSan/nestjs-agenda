# nestjs-agenda
[Agenda](https://github.com/agenda/agenda) module for (Nestjs)[https://github.com/nestjs/nest]

# Installation
```
npm install nestjs-agenda
```

# Usage
Import `AgendaModule`:
**Sync register**:
```
import { AgendaModule } from 'nestjs-agenda';

@Module({
  imports: [AgendaModule.register({ db: { address: 'mongodb://xxxxx' }})], // Same as configuring an agenda  
  providers: [...],
})
export class FooModule {}
```
**Async register**:
```
import { AgendaModule } from 'nestjs-agenda';

@Module({
  imports: [
    AgendaModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        db: { address: config.get('MONGODB_URI') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [...],
})
export class FooModule {}
```
Inject `AgendaService` (AgendaService is a instance of Agenda):
```
@Injectable()
export class FooService {
  construct(private readonly agenda: AgendaService) {
    // define a job, more details: [Agenda documentation](https://github.com/agenda/agenda)
    this.agenda.define('TEST_JOB', { lockLifetime: 10000 }, this.testJob.bind(this));
    // schedule a job
    this.agenda.schedule('10 seconds from now', 'TEST_JOB', {});
  }

  private async testJob(job: any, done: any): Promise<void> {
    console.log('a job');
    await job.remove();
    done();
  }
}
```