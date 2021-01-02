import { Product } from '../product';

it('perform optimistic concurrency control', async (done) => {
  const product = Product.build({
    title: 'test',
    price: 10,
    userId: '123',
  });

  await product.save();

  const firstInstance = await Product.findById(product.id);
  const secondInstance = await Product.findById(product.id);

  firstInstance!.set({ price: 20 });
  secondInstance!.set({ price: 30 });

  await firstInstance!.save();

  // Save second instance and expect an error
  try {
    await secondInstance!.save();
  } catch (error) {
    return done();
  }

  throw new Error('Should not reach here');
});

it('increment product version every update', async () => {
  const product = Product.build({
    title: 'test',
    price: 10,
    userId: '123',
  });

  await product.save();
  expect(product.version).toEqual(0);
  await product.save();
  expect(product.version).toEqual(1);
  await product.save();
  expect(product.version).toEqual(2);
});
