export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: number
          title: string
          slug: string
          excerpt: string | null
          content: string | null
          cover_image: string | null
          category: string | null
          tags: string[] | null
          is_published: boolean
          published_at: string | null
          seo_title: string | null
          seo_description: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['blog_posts']['Row'], 'id' | 'created_at'> & {
          id?: number
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['blog_posts']['Insert']>
      }
      services: {
        Row: {
          id: number
          title: string
          slug: string
          short_description: string | null
          description: string | null
          icon: string | null
          is_published: boolean
          sort_order: number | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['services']['Row'], 'id' | 'created_at'> & {
          id?: number
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['services']['Insert']>
      }
      educations: {
        Row: {
          id: number
          title: string
          institution: string | null
          description: string | null
          image_url: string | null
          is_published: boolean
          sort_order: number | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['educations']['Row'], 'id' | 'created_at'> & {
          id?: number
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['educations']['Insert']>
      }
      testimonials: {
        Row: {
          id: number
          name: string
          position: string | null
          company: string | null
          content: string
          image_url: string | null
          is_published: boolean
          sort_order: number | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['testimonials']['Row'], 'id' | 'created_at'> & {
          id?: number
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['testimonials']['Insert']>
      }
      social_links: {
        Row: {
          id: number
          platform: string
          title: string
          url: string
          icon: string | null
          is_visible: boolean
          sort_order: number | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['social_links']['Row'], 'id' | 'created_at'> & {
          id?: number
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['social_links']['Insert']>
      }
      site_settings: {
        Row: {
          id: number
          site_name: string | null
          site_description: string | null
          favicon: string | null
          logo: string | null
          default_seo_title: string | null
          default_seo_description: string | null
          default_og_image: string | null
          updated_at: string | null
        }
        Insert: Partial<Database['public']['Tables']['site_settings']['Row']>
        Update: Partial<Database['public']['Tables']['site_settings']['Row']>
      }
      contact_messages: {
        Row: {
          id: number
          name: string
          email: string
          phone: string | null
          subject: string | null
          message: string
          is_read: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['contact_messages']['Row'], 'id' | 'created_at' | 'is_read'> & {
          id?: number
          created_at?: string
          is_read?: boolean
        }
        Update: Partial<Database['public']['Tables']['contact_messages']['Insert']>
      }
      media: {
        Row: {
          id: number
          file_name: string
          file_path: string
          public_url: string
          mime_type: string | null
          file_size: number | null
          alt_text: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['media']['Row'], 'id' | 'created_at'> & {
          id?: number
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['media']['Insert']>
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
  }
}
