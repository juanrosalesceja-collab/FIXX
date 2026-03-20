-- ============================================================
-- FIXX — Temporary Test Users (Password: admin123)
-- Run this in Supabase SQL Editor to bypass the registration API.
-- ============================================================

DO $$
DECLARE
    new_user_id UUID;
    i INT;
    hashed_pass TEXT := '$2b$10$Y7gF2dRT5w3eA4Ce7m/PxODJWkSwG3gfvVVnK4a3STJPnlyJmmGYTW';
BEGIN
    FOR i IN 1..10 LOOP
        -- 1. Insert Profile
        INSERT INTO profiles (name, email, password_hash)
        VALUES ('Test User ' || i, 'test' || i || '@fixx.app', hashed_pass)
        RETURNING id INTO new_user_id;

        -- 2. Insert Workshop
        INSERT INTO workshops (user_id, workshop_name)
        VALUES (new_user_id, 'Taller de Prueba ' || i);

        -- 3. Insert Subscription (7 days)
        INSERT INTO subscriptions (user_id, trial_start_at, trial_end_at, status)
        VALUES (new_user_id, NOW(), NOW() + INTERVAL '7 days', 'trialing');

        -- 4. Audit Log
        INSERT INTO audit_logs (user_id, action)
        VALUES (new_user_id, 'manual_test_creation');
    END LOOP;
END $$;
