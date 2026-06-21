/**
 * Typed data accessors. Components import from here, never directly from
 * `content/`. This isolates content changes from component changes and makes
 * the placeholder→real content swap (TASKS.md Task 21) a single-phase,
 * data-only operation.
 *
 * @see `.docs/PLAN.md` Data Architecture
 */
import type {
  Award,
  Certification,
  ExperienceEntry,
  NavItem,
  PersonalInfo,
  Project,
  StackGroup,
} from "./types";
import { awards } from "@/content/awards";
import { certifications } from "@/content/certifications";
import { experience } from "@/content/experience";
import { navigation } from "@/content/navigation";
import { personal } from "@/content/personal";
import { projects } from "@/content/projects";
import { stack } from "@/content/stack";

export function getPersonal(): PersonalInfo {
  return personal;
}

export function getNav(): NavItem[] {
  return navigation;
}

export function getProjects(): Project[] {
  return projects;
}

export function getExperience(): ExperienceEntry[] {
  return experience;
}

export function getStack(): StackGroup[] {
  return stack;
}

export function getAwards(): Award[] {
  return awards;
}

export function getCertifications(): Certification[] {
  return certifications;
}
