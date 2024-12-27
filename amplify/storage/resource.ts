import { defineStorage } from '@aws-amplify/backend';

export const gallery = defineStorage({
  name: 'gallery',
  isDefault: true,
  access: (allow) => ({
    'art/*': [
      allow.guest.to(['read']),
      allow.authenticated.to(['read']),
    ],
    'photos/*': [
      allow.guest.to(['read']),
      allow.authenticated.to(['read']),
    ],
  }),
});