import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useSettingsStore } from '../store/useSettingsStore';
import { useUserStore } from '../store/useUserStore';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/Theme';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { permissions, timeBasedLocks, togglePermission, toggleTimeBasedLock, workHours } = useSettingsStore();
  const { user } = useUserStore();

  const handleBack = () => {
    router.back();
  };

  const handleLogout = () => {
    // Confirm and clear session mock
    router.replace('/');
  };

  const renderToggleRow = (
    label: string,
    value: boolean,
    onToggle: () => void,
    icon: string,
    desc?: string
  ) => {
    return (
      <View style={styles.toggleRow}>
        <View style={styles.rowLeft}>
          <View style={styles.iconBox}>
            <Ionicons name={icon as any} size={20} color={Colors.dark.accent} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.rowLabel}>{label}</Text>
            {desc ? <Text style={styles.rowDesc}>{desc}</Text> : null}
          </View>
        </View>
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: '#2C2F48', true: Colors.dark.accent }}
          thumbColor={value ? '#FFFFFF' : '#94A3B8'}
        />
      </View>
    );
  };

  return (
    <LinearGradient colors={['#0A0E1A', '#131729']} style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + Spacing.lg }]}>
        <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color={Colors.dark.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Text style={styles.avatar}>{user.avatar}</Text>
          <View>
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileEmail}>{user.email}</Text>
          </View>
        </View>

        {/* Feature Permissions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Feature Access Rules</Text>
          <View style={styles.card}>
            {renderToggleRow(
              'Message Scanning',
              permissions.messageScanning,
              () => togglePermission('messageScanning'),
              'mail-outline',
              'Extract rescue items from Gmail, Slack, and messages'
            )}
            {renderToggleRow(
              'Location Tracking',
              permissions.locationTracking,
              () => togglePermission('locationTracking'),
              'location-outline',
              'Enable context-aware and commute scheduling advice'
            )}
            {renderToggleRow(
              'Calendar Integration',
              permissions.calendarIntegration,
              () => togglePermission('calendarIntegration'),
              'calendar-outline',
              'Auto-sync focus blocks and meeting timelines'
            )}
            {renderToggleRow(
              'AI Voice Assistant',
              permissions.aiVoiceAssistant,
              () => togglePermission('aiVoiceAssistant'),
              'mic-outline',
              'Enable spoken triggers and transcripts offline'
            )}
          </View>
        </View>

        {/* Time-Based Locks */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>After Hours Protection</Text>
          <View style={styles.card}>
            {renderToggleRow(
              'Mute After Hours',
              timeBasedLocks.muteAfterHours,
              () => toggleTimeBasedLock('muteAfterHours'),
              'moon-outline',
              `Silence notifications between ${workHours.end} and ${workHours.start}`
            )}
            {renderToggleRow(
              'Weekend Mute',
              timeBasedLocks.weekendMute,
              () => toggleTimeBasedLock('weekendMute'),
              'today-outline',
              'Mute auto-tasking and suggestions on weekends'
            )}
            {renderToggleRow(
              'Vacation Mode',
              timeBasedLocks.vacationMode,
              () => toggleTimeBasedLock('vacationMode'),
              'airplane-outline',
              'Pause all features and active auto-replies'
            )}
          </View>
        </View>

        {/* Security & Audit */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Compliance & Security</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.actionRow}>
              <View style={styles.rowLeft}>
                <View style={styles.iconBox}>
                  <Ionicons name="shield-checkmark-outline" size={20} color={Colors.dark.accentPurple} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.rowLabel}>Privacy Audit Log</Text>
                  <Text style={styles.rowDesc}>Track scanned metadata access audits</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={16} color={Colors.dark.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionRow}>
              <View style={styles.rowLeft}>
                <View style={styles.iconBox}>
                  <Ionicons name="trash-outline" size={20} color={Colors.dark.accentRed} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.rowLabel}>Purge Local Data</Text>
                  <Text style={styles.rowDesc}>Wipe cached databases and tokens</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={16} color={Colors.dark.textMuted} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutBtn}
          activeOpacity={0.8}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>Logout & Clear Cache</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    gap: Spacing.md,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.dark.glassBg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.glassBorder,
  },
  title: {
    ...Typography.h2,
    color: Colors.dark.text,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 60,
    gap: Spacing.lg,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.glassBg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.dark.glassBorder,
    padding: Spacing.lg,
    gap: Spacing.md,
    ...Shadows.sm,
  },
  avatar: {
    fontSize: 36,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.05)',
    textAlign: 'center',
    textAlignVertical: 'center',
    overflow: 'hidden',
  },
  profileName: {
    ...Typography.h3,
    color: Colors.dark.text,
  },
  profileEmail: {
    ...Typography.bodySm,
    color: Colors.dark.textSecondary,
    marginTop: 2,
  },
  section: {
    gap: Spacing.sm,
  },
  sectionTitle: {
    ...Typography.bodySmMedium,
    color: Colors.dark.textSecondary,
    fontWeight: '700',
    paddingLeft: 4,
  },
  card: {
    backgroundColor: Colors.dark.glassBg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.dark.glassBorder,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.04)',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.04)',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.md,
    backgroundColor: 'rgba(255,255,255,0.03)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    paddingRight: Spacing.sm,
  },
  rowLabel: {
    ...Typography.bodySmMedium,
    color: Colors.dark.text,
  },
  rowDesc: {
    fontSize: 10,
    color: Colors.dark.textMuted,
    marginTop: 2,
    lineHeight: 14,
  },
  logoutBtn: {
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.25)',
    paddingVertical: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.lg,
  },
  logoutText: {
    color: Colors.dark.accentRed,
    fontWeight: '700',
    fontSize: 14,
  },
});
