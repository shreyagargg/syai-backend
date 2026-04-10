CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firebase_uid TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE,

    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMP,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX unique_email_active 
ON users(email) 
WHERE is_deleted = FALSE;

CREATE UNIQUE INDEX unique_uid_active 
ON users(firebase_uid) 
WHERE is_deleted = FALSE;

CREATE TYPE gender_enum AS ENUM ('male', 'female', 'other');

CREATE TABLE user_profiles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  phone TEXT UNIQUE NOT NULL CHECK (phone ~ '^[0-9]{10,15}$'),

  city TEXT,
  state TEXT,

  gender gender_enum,
  date_of_birth DATE,

  image_url TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE subscriptions (
    id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,

        plan_type TEXT CHECK (plan_type IN ('free', 'premium', 'pro')),
          status TEXT CHECK (status IN ('active', 'expired', 'cancelled')),

            start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              end_date TIMESTAMP,

                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                  );

                  CREATE INDEX idx_user_subscriptions 
                  ON subscriptions(user_id, status);

                  -- Only ONE active subscription per user
                  CREATE UNIQUE INDEX unique_active_subscription
                  ON subscriptions(user_id)
                  WHERE status = 'active';
                  
)