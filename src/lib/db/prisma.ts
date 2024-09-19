// @ts-nocheck
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
	prisma = new PrismaClient();
} else {
	if (!global.prisma) {
	global.prisma = new PrismaClient();
}
	prisma = global.prisma as any;
}

export default prisma;
