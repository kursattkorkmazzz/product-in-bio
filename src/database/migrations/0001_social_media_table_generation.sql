CREATE TABLE "social_media" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"platform" text NOT NULL,
	"base_url" text,
	"value" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "social_media" ADD CONSTRAINT "social_media_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "lang";--> statement-breakpoint
DROP TYPE "public"."language";