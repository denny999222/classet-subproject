export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: number;
        };
        Insert: {
          id: number;
        };
        Update: {
          id: number;
        };
      };
      questions: {
        Row: {
          id: number;
          text: string;
        };
        Insert: {
          id: number;
          text: string;
        };
        Update: {
          id: number;
          text: string;
        };
      };
      user_answers: {
        Row: {
          id: number;
          user_id: string;
          question_id: number;
          answer: number;
        };
        Insert: {
          id: number;
          user_id: string;
          question_id: number;
          answer: number;
        };
        Update: {
          id: number;
          user_id: string;
          question_id: number;
          answer: number;
        };
      };
      careers: {
        Row: {
          id: number;
          name: string;
          industry: string;
        };
        Insert: {
          id: number;
          name: string;
          industry: string;
        };
        Update: {
          id: number;
          name: string;
          industry: string;
        };
      };
      career_question_weights: {
        Row: {
          id: number;
          career_id: number;
          question_id: number;
          weight: number;
        };
        Insert: {
          id: number;
          career_id: number;
          question_id: number;
          weight: number;
        };
        Update: {
          id: number;
          career_id: number;
          question_id: number;
          weight: number;
        };
      };
    };
  };
}

export type User_Type = Database["public"]["Tables"]["users"]["Row"];

export type UserAnswers_Type =
  Database["public"]["Tables"]["user_answers"]["Row"];

export type Question_Type = Database["public"]["Tables"]["questions"]["Row"];

export type Career_Type = Database["public"]["Tables"]["careers"]["Row"];

export type CareerQuestionWeight_Type =
  Database["public"]["Tables"]["career_question_weights"]["Row"];
