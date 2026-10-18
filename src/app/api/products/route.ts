import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: {
        stock: { gt: 0 },
      },
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        stock: true,
      },
    });

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve products' }, { status: 500 });
  }
}
