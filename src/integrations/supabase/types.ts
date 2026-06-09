export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      enquiries: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          status: Database["public"]["Enums"]["enquiry_status"] | null
          updated_at: string
          vehicle_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          status?: Database["public"]["Enums"]["enquiry_status"] | null
          updated_at?: string
          vehicle_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          status?: Database["public"]["Enums"]["enquiry_status"] | null
          updated_at?: string
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "enquiries_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      happy_customers: {
        Row: {
          caption: string | null
          created_at: string
          customer_name: string | null
          display_order: number
          id: string
          image_url: string
          is_active: boolean
          updated_at: string
        }
        Insert: {
          caption?: string | null
          created_at?: string
          customer_name?: string | null
          display_order?: number
          id?: string
          image_url: string
          is_active?: boolean
          updated_at?: string
        }
        Update: {
          caption?: string | null
          created_at?: string
          customer_name?: string | null
          display_order?: number
          id?: string
          image_url?: string
          is_active?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          created_at: string
          email_address: string | null
          facebook_url: string | null
          id: string
          instagram_url: string | null
          opening_hours: string | null
          phone_number: string | null
          show_warranty_banner: boolean | null
          twitter_url: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email_address?: string | null
          facebook_url?: string | null
          id?: string
          instagram_url?: string | null
          opening_hours?: string | null
          phone_number?: string | null
          show_warranty_banner?: boolean | null
          twitter_url?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email_address?: string | null
          facebook_url?: string | null
          id?: string
          instagram_url?: string | null
          opening_hours?: string | null
          phone_number?: string | null
          show_warranty_banner?: boolean | null
          twitter_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      vehicle_images: {
        Row: {
          created_at: string
          display_order: number | null
          id: string
          image_url: string
          is_main: boolean | null
          vehicle_id: string
        }
        Insert: {
          created_at?: string
          display_order?: number | null
          id?: string
          image_url: string
          is_main?: boolean | null
          vehicle_id: string
        }
        Update: {
          created_at?: string
          display_order?: number | null
          id?: string
          image_url?: string
          is_main?: boolean | null
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_images_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicles: {
        Row: {
          body_type: Database["public"]["Enums"]["body_type"] | null
          colour: string | null
          created_at: string
          description: string | null
          engine_size: string | null
          fuel_type: Database["public"]["Enums"]["fuel_type"]
          id: string
          key_features: string[] | null
          make: string
          mileage: number
          model: string
          mot_expiry_date: string | null
          number_of_owners: number | null
          price: number
          service_history: boolean | null
          service_history_notes: string | null
          status: Database["public"]["Enums"]["vehicle_status"] | null
          transmission: Database["public"]["Enums"]["transmission_type"]
          trim: string | null
          updated_at: string
          warranty_included: boolean | null
          year: number
        }
        Insert: {
          body_type?: Database["public"]["Enums"]["body_type"] | null
          colour?: string | null
          created_at?: string
          description?: string | null
          engine_size?: string | null
          fuel_type: Database["public"]["Enums"]["fuel_type"]
          id?: string
          key_features?: string[] | null
          make: string
          mileage: number
          model: string
          mot_expiry_date?: string | null
          number_of_owners?: number | null
          price: number
          service_history?: boolean | null
          service_history_notes?: string | null
          status?: Database["public"]["Enums"]["vehicle_status"] | null
          transmission: Database["public"]["Enums"]["transmission_type"]
          trim?: string | null
          updated_at?: string
          warranty_included?: boolean | null
          year: number
        }
        Update: {
          body_type?: Database["public"]["Enums"]["body_type"] | null
          colour?: string | null
          created_at?: string
          description?: string | null
          engine_size?: string | null
          fuel_type?: Database["public"]["Enums"]["fuel_type"]
          id?: string
          key_features?: string[] | null
          make?: string
          mileage?: number
          model?: string
          mot_expiry_date?: string | null
          number_of_owners?: number | null
          price?: number
          service_history?: boolean | null
          service_history_notes?: string | null
          status?: Database["public"]["Enums"]["vehicle_status"] | null
          transmission?: Database["public"]["Enums"]["transmission_type"]
          trim?: string | null
          updated_at?: string
          warranty_included?: boolean | null
          year?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin"
      body_type:
        | "hatchback"
        | "saloon"
        | "estate"
        | "suv"
        | "coupe"
        | "convertible"
        | "mpv"
        | "van"
        | "pickup"
      enquiry_status: "new" | "replied" | "closed"
      fuel_type: "petrol" | "diesel" | "electric" | "hybrid" | "plug-in hybrid"
      transmission_type: "manual" | "automatic"
      vehicle_status: "available" | "reserved" | "sold"
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
    Enums: {
      app_role: ["admin"],
      body_type: [
        "hatchback",
        "saloon",
        "estate",
        "suv",
        "coupe",
        "convertible",
        "mpv",
        "van",
        "pickup",
      ],
      enquiry_status: ["new", "replied", "closed"],
      fuel_type: ["petrol", "diesel", "electric", "hybrid", "plug-in hybrid"],
      transmission_type: ["manual", "automatic"],
      vehicle_status: ["available", "reserved", "sold"],
    },
  },
} as const
