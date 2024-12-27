import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
import { data } from './data/resource.js';
import { gallery } from './storage/resource.js';

defineBackend({
  auth,
  data,
  gallery,
});
