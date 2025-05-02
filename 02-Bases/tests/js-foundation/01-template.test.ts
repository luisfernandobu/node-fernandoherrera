import { emailTemplate } from '../../src/js-foundation/01-template';

describe('js-fundation/01-template', () => {
    test('emailTemplate should contain a greeting', () => {
        expect(emailTemplate).toContain('Hi,');
    });
});
