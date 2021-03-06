PGDMP     %                    w            moviesdb    10.10    11.5                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false                       1262    16436    moviesdb    DATABASE     �   CREATE DATABASE moviesdb WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';
    DROP DATABASE moviesdb;
             postgres    false            �            1259    16545    Favoris    TABLE     �   CREATE TABLE public."Favoris" (
    id integer NOT NULL,
    "userId" integer,
    "movieId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Favoris";
       public         postgres    false            �            1259    16543    Favoris_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Favoris_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Favoris_id_seq";
       public       postgres    false    202                       0    0    Favoris_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Favoris_id_seq" OWNED BY public."Favoris".id;
            public       postgres    false    201            �            1259    16523    Movies    TABLE     �   CREATE TABLE public."Movies" (
    id integer NOT NULL,
    title character varying(255),
    image character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Movies";
       public         postgres    false            �            1259    16521    Movies_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Movies_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public."Movies_id_seq";
       public       postgres    false    198                       0    0    Movies_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public."Movies_id_seq" OWNED BY public."Movies".id;
            public       postgres    false    197            �            1259    16516    SequelizeMeta    TABLE     R   CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);
 #   DROP TABLE public."SequelizeMeta";
       public         postgres    false            �            1259    16534    Users    TABLE     �   CREATE TABLE public."Users" (
    id integer NOT NULL,
    username character varying(255),
    avatar character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Users";
       public         postgres    false            �            1259    16532    Users_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Users_id_seq";
       public       postgres    false    200                       0    0    Users_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;
            public       postgres    false    199            �
           2604    16548 
   Favoris id    DEFAULT     l   ALTER TABLE ONLY public."Favoris" ALTER COLUMN id SET DEFAULT nextval('public."Favoris_id_seq"'::regclass);
 ;   ALTER TABLE public."Favoris" ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    202    201    202            �
           2604    16526 	   Movies id    DEFAULT     j   ALTER TABLE ONLY public."Movies" ALTER COLUMN id SET DEFAULT nextval('public."Movies_id_seq"'::regclass);
 :   ALTER TABLE public."Movies" ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    197    198    198            �
           2604    16537    Users id    DEFAULT     h   ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);
 9   ALTER TABLE public."Users" ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    199    200    200            
          0    16545    Favoris 
   TABLE DATA               V   COPY public."Favoris" (id, "userId", "movieId", "createdAt", "updatedAt") FROM stdin;
    public       postgres    false    202   �                 0    16523    Movies 
   TABLE DATA               N   COPY public."Movies" (id, title, image, "createdAt", "updatedAt") FROM stdin;
    public       postgres    false    198   �                 0    16516    SequelizeMeta 
   TABLE DATA               /   COPY public."SequelizeMeta" (name) FROM stdin;
    public       postgres    false    196   b                 0    16534    Users 
   TABLE DATA               Q   COPY public."Users" (id, username, avatar, "createdAt", "updatedAt") FROM stdin;
    public       postgres    false    200   �                  0    0    Favoris_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Favoris_id_seq"', 118, true);
            public       postgres    false    201                       0    0    Movies_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Movies_id_seq"', 9, true);
            public       postgres    false    197                       0    0    Users_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Users_id_seq"', 69, true);
            public       postgres    false    199            �
           2606    16550    Favoris Favoris_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Favoris"
    ADD CONSTRAINT "Favoris_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Favoris" DROP CONSTRAINT "Favoris_pkey";
       public         postgres    false    202            �
           2606    16531    Movies Movies_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Movies"
    ADD CONSTRAINT "Movies_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Movies" DROP CONSTRAINT "Movies_pkey";
       public         postgres    false    198            �
           2606    16520     SequelizeMeta SequelizeMeta_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);
 N   ALTER TABLE ONLY public."SequelizeMeta" DROP CONSTRAINT "SequelizeMeta_pkey";
       public         postgres    false    196            �
           2606    16542    Users Users_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_pkey";
       public         postgres    false    200            
   �   x�}�A� D�5���*��`�9K��B�F�p���6ؓY�$?�R^�C1��{3�I�d-پQP�-�W��,^���X��/M^����`'~K���7M��Y&���>S/�+M�����L���=؀D�˯�����]Σ�\{�o)(��8�h
         �  x���͖�0 ���)��#"*�G�aP�?ƞn�A ����ռC߰OҴ��.<ݸ���|�^��,�|�g�'�'�v��'��l<^����͕e2��y����۲�-ۆ6�:��q�v�Z�"�	OnyY9;@��&�0�L6THЮ78f�yݸH��B����|�?f�{ܮ�-ӱ�;�"�c"���ȹ�p!������8�:Ye䢵����}�.QzY��Tݢ�}<B�ӷ���F�g�ZЃ�,9�J7̅��� N�� QW��[q~}��^y�`����u�ß�?���Uڷ�YM�r�"�;em����= �mY�)�pLʒ2�NI���{Z�g�u��o~'�l�G��R��<���i������w����eȷ�ӴʪBƼ�_}ѻ��.X�D߄S		K��vE��pt!"���ypZK�v�����F$��,���M�0~H>�0         E   x�320�4�02224622�M.JM,I���/�L��*�2B�66�I�����d���2A�1z\\\ (�         �   x����
�0D��W���M�#]�n����>h+���D��Q�݁93̦n��� �$J�D��W-c	0j@(;w�������"B�c�5�dY��L��Uc�tө�KOL�I���[��g�@����,�9嶿�9��|?o�m>_]շ�#,�c\nxG���S�_ '����YkO�c�     