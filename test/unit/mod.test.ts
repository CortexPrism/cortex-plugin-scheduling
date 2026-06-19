// deno-lint-ignore-file require-await
import { assertEquals, assertStringIncludes } from 'https://deno.land/std@0.208.0/assert/mod.ts';
import { tools } from '../../mod.ts';
import type { PluginContext } from 'cortex/plugins';

const ctx: PluginContext = {
  pluginId: 'cortex-plugin-scheduling',
  pluginDir: '/tmp/sched',
  state: { get: async () => null, set: async () => {} },
  config: {},
  logger: { info: () => {}, warn: () => {}, error: () => {}, debug: () => {} },
};
const find = (n: string) => tools.find((t) => t.definition.name === n)!;

Deno.test('sched_find_slots — finds open slots', async () => {
  const r = await find('sched_find_slots').execute({
    platform: 'google',
    attendees: 'alice@example.com,bob@example.com',
    duration_minutes: 30,
  }, ctx);
  assertEquals(r.success, true);
  assertStringIncludes(r.output, 'available_slots');
});

Deno.test('sched_create_event — creates event', async () => {
  const r = await find('sched_create_event').execute({
    platform: 'google',
    title: 'Test Meeting',
    start_time: '2026-06-20T10:00:00Z',
    end_time: '2026-06-20T11:00:00Z',
  }, ctx);
  assertEquals(r.success, true);
  assertStringIncludes(r.output, 'Test Meeting');
});

Deno.test('sched_create_event — rejects missing title', async () => {
  const r = await find('sched_create_event').execute({
    platform: 'google',
    start_time: '2026-06-20T10:00:00Z',
    end_time: '2026-06-20T11:00:00Z',
  }, ctx);
  assertEquals(r.success, false);
});

Deno.test('sched_list_events — returns events', async () => {
  const r = await find('sched_list_events').execute({
    platform: 'google',
    start_date: '2026-06-19',
  }, ctx);
  assertEquals(r.success, true);
  assertStringIncludes(r.output, 'Sprint Planning');
});

Deno.test('sched_get_busy_times — returns availability', async () => {
  const r = await find('sched_get_busy_times').execute({
    platform: 'google',
    email: 'alice@example.com',
    date: '2026-06-20',
  }, ctx);
  assertEquals(r.success, true);
  assertStringIncludes(r.output, 'free');
});

Deno.test('sched_reschedule — reschedules event', async () => {
  const r = await find('sched_reschedule').execute({
    platform: 'google',
    event_id: 'evt_1',
    new_start_time: '2026-06-21T10:00:00Z',
    new_end_time: '2026-06-21T11:00:00Z',
  }, ctx);
  assertEquals(r.success, true);
});

Deno.test('rejects invalid platform', async () => {
  const r = await find('sched_find_slots').execute({
    platform: 'ical' as string,
    attendees: 'a@b.com',
  }, ctx);
  assertEquals(r.success, false);
});

Deno.test('tools array — has 5 tools', () => {
  assertEquals(tools.length, 5);
});
