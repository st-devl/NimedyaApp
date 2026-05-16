import type { ContactStatus } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";

export type ContactRequestInput = {
  name: string;
  email: string;
  message: string;
  serviceType?: string;
  budget?: string;
  timeline?: string;
};

export function createContactRequest(input: ContactRequestInput) {
  return prisma.contactRequest.create({ data: input });
}

export function listContactRequests() {
  return prisma.contactRequest.findMany({ orderBy: { createdAt: "desc" } });
}

export function updateContactRequestStatus(id: number, status: ContactStatus) {
  return prisma.contactRequest.update({ where: { id }, data: { status } });
}

export function deleteContactRequest(id: number) {
  return prisma.contactRequest.delete({ where: { id } });
}
