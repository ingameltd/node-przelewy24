import crypto from 'crypto';

export function calculateSHA384 (data: string): string {
    return crypto.createHash('sha384').update(data, 'utf8').digest('hex')
}