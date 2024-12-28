import { defineStorage } from '@aws-amplify/backend';

export const gallery = defineStorage({
  name: 'gallery',
  isDefault: true,
  access: (allow) => ({
    'art/*': [
      allow.guest.to(['read', 'write']),
      allow.authenticated.to(['read', 'write']),
    ],
    'photos/*': [
      allow.guest.to(['read', 'write']),
      allow.authenticated.to(['read', 'write']),
    ],
  }),
});