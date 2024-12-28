
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://ljmguicmjfhhjzichiec.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqbWd1aWNtamZoaGp6aWNoaWVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUzOTkyNTksImV4cCI6MjA1MDk3NTI1OX0.2myYlbIwAebr6xjuDpVdi4riafEZeKdidMiC5nVsZ_w'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;