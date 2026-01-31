import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock environment variables for tests
vi.stubEnv('NODE_ENV', 'test');
vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://test.supabase.co');
vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'test-anon-key');
vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', 'test-service-key');
vi.stubEnv('ADMIN_PASSWORD_HASH_B64', Buffer.from('$2a$10$test').toString('base64'));
