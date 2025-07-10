export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      counseling_assessments: {
        Row: {
          abstraction: string | null
          address: string | null
          age: string | null
          annual_income: string | null
          approach_of_student: string | null
          approach_towards_faculty: string | null
          appropriateness: string | null
          approved: boolean
          circumstantial: string | null
          cleanliness_habit: string | null
          communication: string | null
          congruity_with: string | null
          consciousness_of_surroundings: string | null
          counselor_remarks: string | null
          created_at: string
          delusions: string | null
          diurnal_variations: string | null
          dress_sense: string | null
          eating_habit: string | null
          education: string | null
          family_history: string | null
          father_email: string | null
          father_mobile: string | null
          father_name: string | null
          father_occupation: string | null
          flight_of_ideas: string | null
          form_of_utterances: string | null
          gender: string | null
          guardian_email: string | null
          guardian_mobile: string | null
          guardian_name: string | null
          guardian_occupation: string | null
          hallucinations: string | null
          id: string
          in_touch_with_surroundings: string | null
          insight: string | null
          intelligence: string | null
          intensity_of_expression: string | null
          judgement: string | null
          leadership_pattern: string | null
          level_of_awareness: string | null
          liability: string | null
          mannerism: string | null
          memory: string | null
          mood: string | null
          mother_email: string | null
          mother_mobile: string | null
          mother_name: string | null
          mother_occupation: string | null
          obsession: string | null
          orientation: string | null
          personality_analysis: string[] | null
          personality_scores: Json | null
          preservation: string | null
          prosody: string | null
          range: string | null
          reaction_time: string | null
          reactivity: string | null
          relevance_and_coherence: string | null
          responsiveness_of_student: string | null
          retardation_of_thinking: string | null
          role_of_function: string[] | null
          roll_number: string
          sin_and_guilt: string | null
          sleeping_habit: string | null
          socio_economic_status: string | null
          speech: string | null
          speech_mannerism: string | null
          spontaneous: string | null
          status: string
          student_email: string | null
          student_mobile: string | null
          student_name: string
          submission_date: string
          test_completed: boolean
          test_completion_date: string | null
          thought_blocks: string | null
          tone: string | null
          updated_at: string
        }
        Insert: {
          abstraction?: string | null
          address?: string | null
          age?: string | null
          annual_income?: string | null
          approach_of_student?: string | null
          approach_towards_faculty?: string | null
          appropriateness?: string | null
          approved?: boolean
          circumstantial?: string | null
          cleanliness_habit?: string | null
          communication?: string | null
          congruity_with?: string | null
          consciousness_of_surroundings?: string | null
          counselor_remarks?: string | null
          created_at?: string
          delusions?: string | null
          diurnal_variations?: string | null
          dress_sense?: string | null
          eating_habit?: string | null
          education?: string | null
          family_history?: string | null
          father_email?: string | null
          father_mobile?: string | null
          father_name?: string | null
          father_occupation?: string | null
          flight_of_ideas?: string | null
          form_of_utterances?: string | null
          gender?: string | null
          guardian_email?: string | null
          guardian_mobile?: string | null
          guardian_name?: string | null
          guardian_occupation?: string | null
          hallucinations?: string | null
          id?: string
          in_touch_with_surroundings?: string | null
          insight?: string | null
          intelligence?: string | null
          intensity_of_expression?: string | null
          judgement?: string | null
          leadership_pattern?: string | null
          level_of_awareness?: string | null
          liability?: string | null
          mannerism?: string | null
          memory?: string | null
          mood?: string | null
          mother_email?: string | null
          mother_mobile?: string | null
          mother_name?: string | null
          mother_occupation?: string | null
          obsession?: string | null
          orientation?: string | null
          personality_analysis?: string[] | null
          personality_scores?: Json | null
          preservation?: string | null
          prosody?: string | null
          range?: string | null
          reaction_time?: string | null
          reactivity?: string | null
          relevance_and_coherence?: string | null
          responsiveness_of_student?: string | null
          retardation_of_thinking?: string | null
          role_of_function?: string[] | null
          roll_number: string
          sin_and_guilt?: string | null
          sleeping_habit?: string | null
          socio_economic_status?: string | null
          speech?: string | null
          speech_mannerism?: string | null
          spontaneous?: string | null
          status?: string
          student_email?: string | null
          student_mobile?: string | null
          student_name: string
          submission_date?: string
          test_completed?: boolean
          test_completion_date?: string | null
          thought_blocks?: string | null
          tone?: string | null
          updated_at?: string
        }
        Update: {
          abstraction?: string | null
          address?: string | null
          age?: string | null
          annual_income?: string | null
          approach_of_student?: string | null
          approach_towards_faculty?: string | null
          appropriateness?: string | null
          approved?: boolean
          circumstantial?: string | null
          cleanliness_habit?: string | null
          communication?: string | null
          congruity_with?: string | null
          consciousness_of_surroundings?: string | null
          counselor_remarks?: string | null
          created_at?: string
          delusions?: string | null
          diurnal_variations?: string | null
          dress_sense?: string | null
          eating_habit?: string | null
          education?: string | null
          family_history?: string | null
          father_email?: string | null
          father_mobile?: string | null
          father_name?: string | null
          father_occupation?: string | null
          flight_of_ideas?: string | null
          form_of_utterances?: string | null
          gender?: string | null
          guardian_email?: string | null
          guardian_mobile?: string | null
          guardian_name?: string | null
          guardian_occupation?: string | null
          hallucinations?: string | null
          id?: string
          in_touch_with_surroundings?: string | null
          insight?: string | null
          intelligence?: string | null
          intensity_of_expression?: string | null
          judgement?: string | null
          leadership_pattern?: string | null
          level_of_awareness?: string | null
          liability?: string | null
          mannerism?: string | null
          memory?: string | null
          mood?: string | null
          mother_email?: string | null
          mother_mobile?: string | null
          mother_name?: string | null
          mother_occupation?: string | null
          obsession?: string | null
          orientation?: string | null
          personality_analysis?: string[] | null
          personality_scores?: Json | null
          preservation?: string | null
          prosody?: string | null
          range?: string | null
          reaction_time?: string | null
          reactivity?: string | null
          relevance_and_coherence?: string | null
          responsiveness_of_student?: string | null
          retardation_of_thinking?: string | null
          role_of_function?: string[] | null
          roll_number?: string
          sin_and_guilt?: string | null
          sleeping_habit?: string | null
          socio_economic_status?: string | null
          speech?: string | null
          speech_mannerism?: string | null
          spontaneous?: string | null
          status?: string
          student_email?: string | null
          student_mobile?: string | null
          student_name?: string
          submission_date?: string
          test_completed?: boolean
          test_completion_date?: string | null
          thought_blocks?: string | null
          tone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
