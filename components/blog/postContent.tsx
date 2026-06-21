import type { ComponentType } from 'react'
import AiVoiceAgentsForHealthcare from './posts/ai-voice-agents-for-healthcare'
import AiChatbotsForDentalMedicalPractices from './posts/ai-chatbots-for-dental-medical-practices'
import HipaaCompliantAiBotsForHealthcare from './posts/hipaa-compliant-ai-bots-for-healthcare'
import EmrEhrIntegrationAiAutomation from './posts/emr-ehr-integration-ai-automation'
import HealthcareDentalPracticeAutomationGuide from './posts/healthcare-dental-practice-automation-guide'

export const postContent: Record<string, ComponentType> = {
  'ai-voice-agents-for-healthcare': AiVoiceAgentsForHealthcare,
  'ai-chatbots-for-dental-medical-practices': AiChatbotsForDentalMedicalPractices,
  'hipaa-compliant-ai-bots-for-healthcare': HipaaCompliantAiBotsForHealthcare,
  'emr-ehr-integration-ai-automation': EmrEhrIntegrationAiAutomation,
  'healthcare-dental-practice-automation-guide': HealthcareDentalPracticeAutomationGuide,
}
