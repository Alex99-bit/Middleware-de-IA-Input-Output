create extension if not exists "pgcrypto";

create table public.workspaces (
  id uuid primary key default gen_random_uuid(), name text not null default 'Mi empresa', logo_url text, brand_color text not null default '#5b55d9', created_at timestamptz not null default now()
);
create table public.workspace_members (
  workspace_id uuid references public.workspaces on delete cascade, user_id uuid references auth.users on delete cascade, role text not null default 'member' check (role in ('owner','admin','member')), primary key (workspace_id, user_id)
);
create table public.catalog_items (
  id uuid primary key default gen_random_uuid(), workspace_id uuid references public.workspaces on delete cascade not null, name text not null, description text not null default '', price numeric not null default 0, currency text not null default 'USD', active boolean not null default true, created_at timestamptz not null default now()
);
create table public.quotes (
  id uuid primary key default gen_random_uuid(), workspace_id uuid references public.workspaces on delete cascade not null, created_by uuid references auth.users, client_name text not null, request text not null, quote jsonb not null, status text not null default 'draft', created_at timestamptz not null default now()
);

create or replace function public.is_workspace_member(target_workspace uuid) returns boolean language sql security definer set search_path = public as $$ select exists(select 1 from workspace_members where workspace_id = target_workspace and user_id = auth.uid()) $$;
alter table public.workspaces enable row level security; alter table public.workspace_members enable row level security; alter table public.catalog_items enable row level security; alter table public.quotes enable row level security;
create policy "members read workspaces" on public.workspaces for select using (public.is_workspace_member(id));
create policy "members read members" on public.workspace_members for select using (public.is_workspace_member(workspace_id));
create policy "members manage catalog" on public.catalog_items for all using (public.is_workspace_member(workspace_id)) with check (public.is_workspace_member(workspace_id));
create policy "members manage quotes" on public.quotes for all using (public.is_workspace_member(workspace_id)) with check (public.is_workspace_member(workspace_id));

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$ declare new_workspace uuid; begin insert into workspaces(name) values (coalesce(new.raw_user_meta_data->>'company_name', 'Mi empresa')) returning id into new_workspace; insert into workspace_members(workspace_id, user_id, role) values (new_workspace, new.id, 'owner'); return new; end; $$;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();
