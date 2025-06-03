import { CronService } from "./cron.service";


describe('cron.service.ts', () => {

    const mockOnTick = jest.fn();

    test('should create a job', (done) => { 
        const job = CronService.createJob('* * * * * *', mockOnTick);

        setTimeout(() => {
            expect(mockOnTick).toHaveBeenCalled();
            job.stop();
            done();
        }, 2000);
    });
});
