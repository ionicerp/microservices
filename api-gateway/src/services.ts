export const getServiceUrl = (service: string) => {
  const services = [
    { name: 'product', url: 'https://product-6b6yfpthva-uc.a.run.app' },
    { name: 'service-order', url: 'https://service-order-6b6yfpthva-uc.a.run.app' },
    { name: 'pdf-generator', url: 'https://pdf-generator-6b6yfpthva-uc.a.run.app' },
  ];
  return services.find((s) => s.name === service)?.url;
};
