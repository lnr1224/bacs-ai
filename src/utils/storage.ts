import { SavedProfile, BusinessJSON, IntelligenceAnalysis, CopilotMessage, BusinessStage } from '../types';

const STORAGE_KEY = 'bacs_saved_profiles_v1';
const ACTIVE_PROFILE_KEY = 'bacs_active_profile_id';

export function getSavedProfiles(): SavedProfile[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse saved profiles from localStorage:', err);
    return [];
  }
}

export function saveProfile(
  businessJson: BusinessJSON,
  analysis: IntelligenceAnalysis,
  existingId?: string,
  copilotHistory?: CopilotMessage[]
): SavedProfile {
  const profiles = getSavedProfiles();
  const id = existingId || `profile_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const now = new Date().toISOString();

  const existingIndex = profiles.findIndex((p) => p.id === id);
  const updatedProfile: SavedProfile = {
    id,
    createdAt: existingIndex >= 0 ? profiles[existingIndex].createdAt : now,
    updatedAt: now,
    stage: businessJson.business.stage,
    businessJson,
    analysis,
    copilotHistory: copilotHistory || (existingIndex >= 0 ? profiles[existingIndex].copilotHistory : [])
  };

  if (existingIndex >= 0) {
    profiles[existingIndex] = updatedProfile;
  } else {
    profiles.unshift(updatedProfile);
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
    localStorage.setItem(ACTIVE_PROFILE_KEY, id);
  } catch (err) {
    console.error('Failed to save profile to localStorage:', err);
  }

  return updatedProfile;
}

export function getActiveProfileId(): string | null {
  return localStorage.getItem(ACTIVE_PROFILE_KEY);
}

export function setActiveProfileId(id: string): void {
  localStorage.setItem(ACTIVE_PROFILE_KEY, id);
}

export function deleteProfile(id: string): SavedProfile[] {
  let profiles = getSavedProfiles();
  profiles = profiles.filter((p) => p.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
    const active = getActiveProfileId();
    if (active === id) {
      if (profiles.length > 0) {
        localStorage.setItem(ACTIVE_PROFILE_KEY, profiles[0].id);
      } else {
        localStorage.removeItem(ACTIVE_PROFILE_KEY);
      }
    }
  } catch (err) {
    console.error('Failed to delete profile from localStorage:', err);
  }
  return profiles;
}

export function saveCopilotHistory(profileId: string, messages: CopilotMessage[]): void {
  const profiles = getSavedProfiles();
  const index = profiles.findIndex((p) => p.id === profileId);
  if (index >= 0) {
    profiles[index].copilotHistory = messages;
    profiles[index].updatedAt = new Date().toISOString();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
    } catch (err) {
      console.error('Failed to save copilot history:', err);
    }
  }
}
