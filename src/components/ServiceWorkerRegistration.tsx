'use client';

import { useEffect } from 'react';
import { register } from '@/utils/registerSW';

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    register();
  }, []);

  return null;
} 