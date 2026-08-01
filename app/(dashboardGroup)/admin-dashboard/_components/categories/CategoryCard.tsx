import { CalendarDays, Clock, FolderKanban, Hash } from "lucide-react";

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import CategoryFormDialog from "./CategoryFormDialog";
import { Category } from "@/lib/type";

type CategoryCardProps = {
  category: Category;
};

// Pure helper function to format dates cleanly
const formatDate = (date?: string | Date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const CategoryCard = ({ category }: CategoryCardProps) => {
  const createdDate = formatDate(category?.createdAt);
  const updatedDate = formatDate(category?.updatedAt);

  return (
    <Card className="group relative flex h-full flex-col justify-between overflow-hidden border-border/60 bg-card/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
      {/* Top Gradient Accent Bar on Hover */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3.5 min-w-0">
              {/* Styled Icon Container */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 via-primary/10 to-transparent text-primary ring-1 ring-primary/20 transition-transform duration-300 group-hover:scale-105">
                <FolderKanban className="h-6 w-6" />
              </div>

              <div className="min-w-0">
                <CardTitle className="truncate text-base font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                  {category?.name || "Unnamed Category"}
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  Category Details
                </p>
              </div>
            </div>

            <CardAction className="shrink-0">
              <CategoryFormDialog mode="edit" category={category} />
            </CardAction>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pt-2">
          {/* Category ID Box */}
          <div className="flex items-center justify-between gap-2 rounded-xl border border-border/40 bg-muted/30 p-2.5 transition-colors group-hover:bg-muted/50">
            <div className="flex items-center gap-2 min-w-0">
              <Hash className="h-3.5 w-3.5 shrink-0 text-muted-foreground/70" />
              <span
                className="select-all truncate font-mono text-xs font-medium text-muted-foreground hover:text-foreground"
                title={category?.id}
              >
                {category?.id || "N/A"}
              </span>
            </div>
            <span className="shrink-0 rounded-md border border-border/30 bg-background/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80">
              ID
            </span>
          </div>
        </CardContent>
      </div>

      {/* Date Details Grid */}
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-2 border-t border-border/40 pt-3 text-xs">
          <div className="flex flex-col gap-1 rounded-lg border border-border/30 bg-muted/20 p-2">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <CalendarDays className="h-3.5 w-3.5 text-primary/70" />
              <span className="text-[11px] font-medium">Created</span>
            </div>
            <span className="font-medium text-foreground/90">
              {createdDate}
            </span>
          </div>

          <div className="flex flex-col gap-1 rounded-lg border border-border/30 bg-muted/20 p-2">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="h-3.5 w-3.5 text-primary/70" />
              <span className="text-[11px] font-medium">Updated</span>
            </div>
            <span className="font-medium text-foreground/90">
              {updatedDate}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
