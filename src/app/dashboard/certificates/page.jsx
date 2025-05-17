"use client"

import { Copy, ExternalLink, MoreHorizontal, Pencil, Share2, Trash2 } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { CopyButton } from "@/components/animate-ui/buttons/copy"
import { UploadDocument } from "@/components/dashboard/upload-file"

const certificates = [
  {
    id: "CERT-2023-0001",
    title: "Web3 Development Fundamentals",
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
    view: "/dashboard/certificates/3",
    share: "/dashboard/certificates/share/1",
  },
  {
    id: "CERT-2023-0002",
    title: "Blockchain Essentials",
    image: "/assets/images/cr.png",
    issuedTo: "John Doe",
    issuedBy: "Crypto University",
    issueDate: "2023-07-20",
    expiryDate: "2026-07-20",
    credentialID: "cred-67890-fghij",
    address: "0x7b1fD3e5A3Cc12eFa9D35B21AaF9301A59d98Ac2",
    skills: ["Solidity", "Smart Contracts", "Ethereum"],
    description:
      "Awarded for completing the Blockchain Essentials program, covering foundational concepts of blockchain networks and smart contract development.",
    verificationUrl: "https://example.com/verify/cred-67890-fghij",
    status: "Valid",
    view: "/dashboard/certificates/4",
    share: "/dashboard/certificates/share/2",
  },
  {
    id: "CERT-2023-0003",
    title: "Full Stack DApp Developer",
    image: "/assets/images/cr.png",
    issuedTo: "John Doe",
    issuedBy: "Web3 Bootcamp",
    issueDate: "2023-09-10",
    expiryDate: "2026-09-10",
    credentialID: "cred-11223-xyzkl",
    address: "0x3aF5C1Bc9E9dE3Df8747B85a44cD96a67e8A7b3c",
    skills: ["React", "Hardhat", "Ethers.js", "IPFS"],
    description:
      "Recognized for the successful completion of the Full Stack DApp Developer course, with hands-on experience building decentralized applications.",
    verificationUrl: "https://example.com/verify/cred-11223-xyzkl",
    status: "Valid",
    view: "/dashboard/certificates/5",
    share: "/dashboard/certificates/share/3",
  },
];

export default function CertificateCards() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCertificates = certificates.filter(
    (cert) =>
      cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.address.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCopyAddress = (address) => {
    navigator.clipboard.writeText(address);
  }

  return (
    <div className="space-y-6 p-6">
    <div className="flex lg:flex-row flex-col-reverse lg:items-center justify-between gap-5">
    <div className="flex items-center gap-4">
        <UploadDocument/>
        <Button variant="outline" className="gap-2">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            </svg>
            Create folder
        </Button>
        </div>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          placeholder="Search certificates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button type="submit">Search</Button>
      </div>
    </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCertificates.map((certificate) => (
          <Card key={certificate.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle>{certificate.title}</CardTitle>
              <CardDescription>{certificate.issuedBy}</CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="space-y-2">
                <div>
                  <Label className="text-xs font-medium">Blockchain Address</Label>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="truncate rounded bg-muted px-2 py-1 text-xs font-mono">{certificate.address}</div>
                    <CopyButton variant="outline" onClick={() => handleCopyAddress(certificate.address)} content="Content to copy" size="sm"/>
                  </div>
                </div>
                <div>
                  <Label className="text-xs font-medium">Issue Date</Label>
                  <div className="mt-1 text-sm">{certificate.issueDate}</div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-3">
              <Button asChild variant="outline" size="sm">
              <Link href={certificate.view}>
                <ExternalLink className="mr-2 h-3.5 w-3.5" />
                Open
              </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                  <Link href={certificate.share}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
