CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" text NOT NULL,
	"icon" text NOT NULL,
	"color" text NOT NULL,
	"order" integer DEFAULT 0,
	CONSTRAINT "categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "goals" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"image" text NOT NULL,
	"color" text NOT NULL,
	"goal_id" integer NOT NULL,
	"featured" boolean DEFAULT false,
	"impact_metric" text,
	"impact_value" text,
	"impact_description" text,
	"category_id" integer,
	CONSTRAINT "goals_goal_id_unique" UNIQUE("goal_id")
);
--> statement-breakpoint
CREATE TABLE "pledges" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"goal_id" integer NOT NULL,
	"story" text,
	"city" text NOT NULL,
	"country" text NOT NULL,
	"photo_url" text,
	"created_at" timestamp DEFAULT now()
);
