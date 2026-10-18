import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { userId, productId, quantity } = await request.json();

    if (!userId || !productId || !quantity || quantity <= 0) {
      return NextResponse.json({ error: 'Invalid checkout parameters' }, { status: 400 });
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });

    if (!product || product.stock < quantity) {
      return NextResponse.json({ error: 'Product is unavailable or out of stock' }, { status: 400 });
    }

    const total = product.price * quantity;

    // Execute order creation and inventory decrement atomically
    const [order] = await prisma.$transaction([
      prisma.order.create({
        data: {
          userId,
          total,
          status: 'PAID',
        },
      }),
      prisma.product.update({
        where: { id: productId },
        data: {
          stock: { decrement: quantity },
        },
      }),
    ]);

    return NextResponse.json({ message: 'Order processed successfully', order }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Checkout processing failed' }, { status: 500 });
  }
}
