"use client"

import { CopyButton } from "@/components/animate-ui/buttons/copy"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { IconTrash } from "@tabler/icons-react"
import { Award, Calendar, ChevronDown, Clock, Copy, FileText, User, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const certificates = {
    id: "CERT-2023-0001",
    title: "Advanced Web Development",
    image: "/assets/images/cr.png",
    issuedTo: "John Doe",
    issuedBy: "Tech Academy",
    issueDate: "2023-05-15",
    expiryDate: "2026-05-15",
    credentialID: "cred-12345-abcde",
    address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    skills: ["React", "Node.js", "TypeScript", "GraphQL"],
    description:
      "This certificate is awarded for successfully completing the Advanced Web Development course, demonstrating proficiency in modern web technologies and best practices.",
    verificationUrl: "https://example.com/verify/cred-12345-abcde",
    status: "Valid",
  }

const ButtonDelete = () => {
    return(
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full justify-start cursor-pointer">
                <IconTrash className="mr-2 h-4 w-4" />
                Delete Certificate
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your
                    certificate and remove your data from our servers.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction variant="destructive">Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default function Page() {

const handleCopyAddress = (address) => {
    navigator.clipboard.writeText(address);
    }

  return (
    <div className="container p-6">
        <div className="mb-6 flex items-center justify-between">
        <div>
            <h2 className="text-2xl font-bold">{certificates.title}</h2>
            <p className="text-muted-foreground">Certificate ID: {certificates.id}</p>
        </div>
        <Badge variant={certificates.status === "Valid" ? "" : "destructive"} className="px-4 py-1">
            {certificates.status}
        </Badge>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
        <Card className="h-fit">
            <CardHeader>
            <CardTitle>Certificate Information</CardTitle>
            <CardDescription>Details about this certificate and its metadata</CardDescription>
            </CardHeader>
            <CardContent>
            <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <Label className="text-sm text-muted-foreground">Issued To</Label>
                    <div className="mt-1 flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{certificates.issuedTo}</span>
                    </div>
                </div>

                <div>
                    <Label className="text-sm text-muted-foreground">Issued By</Label>
                    <div className="mt-1 flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{certificates.issuedBy}</span>
                    </div>
                </div>

                <div>
                    <Label className="text-sm text-muted-foreground">Issue Date</Label>
                    <div className="mt-1 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{certificates.issueDate}</span>
                    </div>
                </div>

                <div>
                    <Label className="text-sm text-muted-foreground">Expiry Date</Label>
                    <div className="mt-1 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{certificates.expiryDate}</span>
                    </div>
                </div>

                <div>
                    <Label className="text-sm text-muted-foreground">Credential ID</Label>
                    <div className="mt-1 font-medium">{certificates.credentialID}</div>
                </div>

                <div>
                    <Label className="text-sm text-muted-foreground">Verification URL</Label>
                    <div className="mt-1">
                    <a href={certificates.verificationUrl} className="text-primary hover:underline font-medium">
                        Verify Certificate
                    </a>
                    </div>
                </div>
                </div>

                <div>
                <Label className="text-sm text-muted-foreground">Description</Label>
                <p className="mt-1">{certificates.description}</p>
                </div>

                <div>
                <Label className="text-sm text-muted-foreground">Skills</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                    {certificates.skills.map((skill) => (
                    <Badge key={skill} variant="outline">
                        {skill}
                    </Badge>
                    ))}
                </div>
                </div>
            </div>
            </CardContent>
        </Card>

        <Card className="h-fit">
            <CardHeader>
            <CardTitle>Blockchain Information</CardTitle>
            <CardDescription>Blockchain details for verification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
            <div className="space-y-2">
                <div>
                  <Label className="text-xs font-medium">Certificate Address</Label>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="truncate rounded bg-muted px-2 py-1 text-xs font-mono">{certificates.address}</div>
                    <CopyButton variant="outline" onClick={() => handleCopyAddress(certificates.address)} content="Content to copy" size="sm"/>
                  </div>
                </div>
            </div>
            </CardContent>
        </Card>
        </div>


        <div className="space-y-6">
            <Card className="h-fit">
            <CardHeader>
                <CardTitle>Certificate Preview</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="aspect-[4/3] rounded-md bg-muted flex items-center justify-center">
                <Image src={certificates.image} alt={certificates.title} width={300} height={300} />
                </div>
                <div className="mt-4 flex justify-center">
                <Button>Download Certificate</Button>
                </div>
            </CardContent>
            </Card>

            <Card className="h-fit">
            <CardHeader>
                <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/dashboard/certificates/share/123">
                <Users className="mr-2 h-4 w-4" />
                Share Certificate
                </Link>
                </Button>
                <ButtonDelete/>
            </CardContent>
            </Card>
        </div>
        </div>
    </div>
  )
}