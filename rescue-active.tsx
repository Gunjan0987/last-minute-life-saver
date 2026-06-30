import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  Vibration,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useRescueStore } from '../store/useRescueStore';
import { useTaskStore } from '../store/useTaskStore';
import { teamMembers } from '../data/teamMembers';
import { getRescueTemplates } from '../utils/rescue';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/Theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function RescueActiveScreen() {
  const insets = useSafeAreaInsets();
  const { triageQueue, triageProgress, triageTask, deactivateRescue } = useRescueStore();
  
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  // Focus Pomodoro Timer State (25 minutes default)
  const [pomoSeconds, setPomoSeconds] = useState(25 * 60);
  const [isPomoRunning, setIsPomoRunning] = useState(false);
  const pomoTimerRef = useRef<any>(null);

  // Heartbeat animation refs
  const heartbeatAnim = useRef(new Animated.Value(1)).current;

  // Breathing exercise state
  const [breathText, setBreathText] = useState('Breathe In');
  const breatheAnim = useRef(new Animated.Value(1)).current;

  // Apology communication templates
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const templates = getRescueTemplates();

  // Active timers
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Pomodoro countdown timer
  useEffect(() => {
    if (isPomoRunning) {
      pomoTimerRef.current = setInterval(() => {
        setPomoSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(pomoTimerRef.current);
            setIsPomoRunning(false);
            handlePomoComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(pomoTimerRef.current);
    }
    return () => clearInterval(pomoTimerRef.current);
  }, [isPomoRunning]);

  // Heartbeat animation loop
  useEffect(() => {
    const runHeartbeat = () => {
      Animated.sequence([
        Animated.timing(heartbeatAnim, {
          toValue: 1.1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(heartbeatAnim, {
          toValue: 1.0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(heartbeatAnim, {
          toValue: 1.15,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(heartbeatAnim, {
          toValue: 1.0,
          duration: 650,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Tick a light vibration if active
        if (Platform.OS !== 'web') {
          Vibration.vibrate(15);
        }
        runHeartbeat();
      });
    };

    runHeartbeat();
    return () => heartbeatAnim.stopAnimation();
  }, []);

  // Breathing exercise animation loop
  useEffect(() => {
    const runBreathingCycle = () => {
      setBreathText('Breathe In...');
      Animated.timing(breatheAnim, {
        toValue: 1.4,
        duration: 4000,
        useNativeDriver: true,
      }).start(() => {
        setBreathText('Hold...');
        setTimeout(() => {
          setBreathText('Breathe Out...');
          Animated.timing(breatheAnim, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
          }).start(() => {
            setBreathText('Hold...');
            setTimeout(runBreathingCycle, 2000);
          });
        }, 4000);
      });
    };

    runBreathingCycle();
    return () => breatheAnim.stopAnimation();
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleTriage = (id: string, action: 'mustDo' | 'defer' | 'delegate' | 'drop', details?: any) => {
    if (Platform.OS !== 'web') {
      Vibration.vibrate(50);
    }
    triageTask(id, action, details);

    // If queue is now empty, trigger celebration
    if (triageQueue.length <= 1) {
      setShowCelebration(true);
      if (Platform.OS !== 'web') {
        Vibration.vibrate([0, 200, 100, 300]);
      }
    }
  };

  const handlePomoComplete = () => {
    setShowCelebration(true);
    if (Platform.OS !== 'web') {
      Vibration.vibrate([0, 100, 50, 150]);
    }
  };

  const togglePomo = () => {
    setIsPomoRunning(!isPomoRunning);
  };

  const resetPomo = () => {
    setIsPomoRunning(false);
    setPomoSeconds(25 * 60);
  };

  const handleExit = () => {
    deactivateRescue();
    router.back();
  };

  const progressPercent = triageProgress.total > 0
    ? (triageProgress.current / triageProgress.total) * 100
    : 0;

  return (
    <LinearGradient colors={['#1E0A0A', '#0F0505']} style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + Spacing.lg }]}>
        <View style={styles.headerTop}>
          <Animated.View style={[
            styles.activeLabelBox,
            { transform: [{ scale: heartbeatAnim }] }
          ]}>
            <View style={styles.redPulseDot} />
            <Text style={styles.activeLabel}>RESCUE TAKEOVER ACTIVE</Text>
          </Animated.View>
          <Text style={styles.timer}>{formatTime(elapsedSeconds)}</Text>
        </View>
        
        {/* Progress Bar */}
        <View style={styles.progressSection}>
          <View style={styles.progressLabels}>
            <Text style={styles.progressText}>Crisis Triage Progress</Text>
            <Text style={styles.progressText}>
              {triageProgress.current} of {triageProgress.total}
            </Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 120 }]} showsVerticalScrollIndicator={false}>
        
        {/* Celebration State Overlay */}
        {showCelebration && (
          <View style={styles.celebrationCard}>
            <Ionicons name="trophy-outline" size={48} color={Colors.dark.accentYellow} />
            <Text style={styles.celebrationTitle}>Crisis Resolved!</Text>
            <Text style={styles.celebrationDesc}>
              AI rescue tasks completed or safely triaged. Your energy levels and schedules are stable.
            </Text>
            <TouchableOpacity
              style={styles.celebrationDoneBtn}
              onPress={() => setShowCelebration(false)}
            >
              <Text style={styles.celebrationDoneBtnText}>Dismiss</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Focus Pomodoro Timer Widget */}
        <View style={styles.pomoCard}>
          <Text style={styles.pomoTitle}>🍅 Emergency Focus Block</Text>
          <View style={styles.pomoDisplayContainer}>
            <Text style={styles.pomoTimeText}>{formatTime(pomoSeconds)}</Text>
            <View style={styles.pomoControls}>
              <TouchableOpacity style={styles.pomoBtn} onPress={togglePomo}>
                <Ionicons name={isPomoRunning ? 'pause' : 'play'} size={20} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.pomoBtn} onPress={resetPomo}>
                <Ionicons name="refresh" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.pomoProgressBg}>
            <View style={[styles.pomoProgressFill, { width: `${(pomoSeconds / (25 * 60)) * 100}%` }]} />
          </View>
        </View>

        {/* Triage Queue Section */}
        {triageQueue.length > 0 ? (
          <View style={styles.queueContainer}>
            <Text style={styles.sectionTitle}>Triage Queue</Text>
            <View style={styles.taskCard}>
              <View style={styles.cardHeader}>
                <View style={styles.priorityBox}>
                  <Text style={styles.priorityText}>{triageQueue[0].priorityBand.toUpperCase()}</Text>
                </View>
                <Text style={styles.estTime}>{triageQueue[0].estimatedMinutes} MIN</Text>
              </View>
              <Text style={styles.taskTitle}>{triageQueue[0].title}</Text>
              {triageQueue[0].description ? (
                <Text style={styles.taskDesc}>{triageQueue[0].description}</Text>
              ) : null}

              {/* Triage Action Grid */}
              <View style={styles.triageActionGrid}>
                <TouchableOpacity
                  style={[styles.triageBtn, { borderColor: Colors.dark.accentGreen }]}
                  onPress={() => handleTriage(triageQueue[0].id, 'mustDo')}
                >
                  <Ionicons name="checkmark-circle-outline" size={18} color={Colors.dark.accentGreen} />
                  <Text style={[styles.triageBtnText, { color: Colors.dark.accentGreen }]}>MUST DO</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.triageBtn, { borderColor: Colors.dark.accentOrange }]}
                  onPress={() => handleTriage(triageQueue[0].id, 'defer')}
                >
                  <Ionicons name="time-outline" size={18} color={Colors.dark.accentOrange} />
                  <Text style={[styles.triageBtnText, { color: Colors.dark.accentOrange }]}>DEFER 1D</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.triageBtn, { borderColor: Colors.dark.accentPurple }]}
                  onPress={() => handleTriage(triageQueue[0].id, 'delegate')}
                >
                  <Ionicons name="people-outline" size={18} color={Colors.dark.accentPurple} />
                  <Text style={[styles.triageBtnText, { color: Colors.dark.accentPurple }]}>DELEGATE</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.triageBtn, { borderColor: Colors.dark.accentRed }]}
                  onPress={() => handleTriage(triageQueue[0].id, 'drop')}
                >
                  <Ionicons name="close-circle-outline" size={18} color={Colors.dark.accentRed} />
                  <Text style={[styles.triageBtnText, { color: Colors.dark.accentRed }]}>DROP</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.emptyQueue}>
            <Ionicons name="checkmark-circle" size={48} color={Colors.dark.accentGreen} />
            <Text style={styles.emptyTitle}>Triage Completed!</Text>
            <Text style={styles.emptySub}>All items sorted. Take a deep breath.</Text>
          </View>
        )}

        {/* Breathing Exercise Center */}
        <View style={styles.breatheSection}>
          <Text style={styles.sectionTitle}>Sanity & Breathing Break</Text>
          <View style={styles.breatheCard}>
            <Animated.View style={[styles.breatheCircle, { transform: [{ scale: breatheAnim }] }]}>
              <Text style={styles.breatheCircleText}>{breathText}</Text>
            </Animated.View>
            <Text style={styles.breatheTip}>Follow the circle to regulate stress levels.</Text>
          </View>
        </View>

        {/* Automated Communications */}
        <View style={styles.commSection}>
          <Text style={styles.sectionTitle}>Apology & Status Auto-Templates</Text>
          <Text style={styles.sectionSubtitle}>Send delay explanations to managers or clients with one-tap</Text>
          
          <View style={styles.templatesGrid}>
            {templates.map((tmpl) => (
              <TouchableOpacity
                key={tmpl.id}
                style={[
                  styles.tmplCard,
                  selectedTemplate === tmpl.id && styles.tmplCardActive
                ]}
                onPress={() => setSelectedTemplate(tmpl.id === selectedTemplate ? null : tmpl.id)}
              >
                <View style={styles.tmplHeader}>
                  <Ionicons name={tmpl.icon as any} size={18} color={Colors.dark.accentRed} />
                  <Text style={styles.tmplLabel}>{tmpl.label}</Text>
                </View>
                <Text style={styles.tmplText} numberOfLines={3}>{tmpl.template}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Exit Rescue Mode */}
        <TouchableOpacity
          style={styles.exitBtn}
          activeOpacity={0.8}
          onPress={handleExit}
        >
          <Text style={styles.exitBtnText}>Exit Rescue Mode</Text>
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
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(239, 68, 68, 0.1)',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  activeLabelBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    paddingVertical: 6,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  redPulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  activeLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: '#EF4444',
    letterSpacing: 1.5,
  },
  timer: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  progressSection: {
    gap: 6,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.dark.textSecondary,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#EF4444',
    borderRadius: 3,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    gap: Spacing.xl,
  },
  celebrationCard: {
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
    borderColor: Colors.dark.accentGreen,
    padding: Spacing.lg,
    alignItems: 'center',
    gap: Spacing.sm,
    ...Shadows.glow(Colors.dark.accentGreen),
  },
  celebrationTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.dark.accentGreen,
  },
  celebrationDesc: {
    fontSize: 12,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  celebrationDoneBtn: {
    backgroundColor: Colors.dark.accentGreen,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.sm,
  },
  celebrationDoneBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 12,
  },
  pomoCard: {
    backgroundColor: Colors.dark.glassBg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.dark.glassBorder,
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  pomoTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.dark.text,
  },
  pomoDisplayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pomoTimeText: {
    fontSize: 32,
    fontWeight: '900',
    color: Colors.dark.text,
  },
  pomoControls: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  pomoBtn: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  pomoProgressBg: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  pomoProgressFill: {
    height: '100%',
    backgroundColor: Colors.dark.accentRed,
    borderRadius: 2,
  },
  queueContainer: {
    gap: Spacing.md,
  },
  sectionTitle: {
    ...Typography.h3,
    color: Colors.dark.text,
  },
  sectionSubtitle: {
    ...Typography.caption,
    color: Colors.dark.textSecondary,
    marginTop: -8,
  },
  taskCard: {
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
    padding: Spacing.lg,
    ...Shadows.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  priorityBox: {
    backgroundColor: '#EF4444',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  priorityText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  estTime: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.dark.textSecondary,
  },
  taskTitle: {
    ...Typography.h2,
    color: Colors.dark.text,
    marginBottom: Spacing.xs,
  },
  taskDesc: {
    ...Typography.bodySm,
    color: Colors.dark.textSecondary,
    marginBottom: Spacing.lg,
    lineHeight: 18,
  },
  triageActionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  triageBtn: {
    flex: 1,
    minWidth: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.md,
    borderWidth: 1.5,
    borderRadius: BorderRadius.md,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  triageBtnText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  emptyQueue: {
    alignItems: 'center',
    padding: Spacing.xl,
    backgroundColor: Colors.dark.glassBg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.dark.glassBorder,
    gap: Spacing.sm,
  },
  emptyTitle: {
    ...Typography.h3,
    color: Colors.dark.text,
  },
  emptySub: {
    ...Typography.bodySm,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
  },
  breatheSection: {
    gap: Spacing.md,
  },
  breatheCard: {
    backgroundColor: Colors.dark.glassBg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.dark.glassBorder,
    padding: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.lg,
  },
  breatheCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderWidth: 1.5,
    borderColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  breatheCircleText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  breatheTip: {
    ...Typography.caption,
    color: Colors.dark.textSecondary,
  },
  commSection: {
    gap: Spacing.md,
  },
  templatesGrid: {
    gap: Spacing.sm,
  },
  tmplCard: {
    backgroundColor: Colors.dark.glassBg,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.dark.glassBorder,
    padding: Spacing.md,
  },
  tmplCardActive: {
    borderColor: '#EF4444',
    backgroundColor: 'rgba(239, 68, 68, 0.04)',
  },
  tmplHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: 6,
  },
  tmplLabel: {
    ...Typography.bodySmMedium,
    color: Colors.dark.text,
    fontWeight: '700',
  },
  tmplText: {
    ...Typography.caption,
    color: Colors.dark.textSecondary,
    lineHeight: 16,
  },
  exitBtn: {
    backgroundColor: Colors.dark.surfaceLight,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.glassBorder,
    marginTop: Spacing.lg,
    marginBottom: Spacing.huge,
  },
  exitBtnText: {
    color: Colors.dark.textSecondary,
    fontWeight: '700',
    fontSize: 14,
  },
});
