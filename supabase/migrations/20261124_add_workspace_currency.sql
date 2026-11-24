alter table public.workspaces
  add column if not exists currency text not null default 'USD';
