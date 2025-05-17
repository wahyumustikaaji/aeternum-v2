"use client"

import { Copy, Download, Facebook, Linkedin, QrCode, Share2, Twitter } from "lucide-react"
import QRCode from "react-qr-code"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CopyButton } from "@/components/animate-ui/buttons/copy"

export default function CertificateSharePage() {
  const certificateId = "cert-123456"
  const certificateUrl = `https://example.com/certificates/${certificateId}`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(certificateUrl)
      toast({
        title: "Link copied",
        description: "The certificate link has been copied to your clipboard",
      })
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy the link to clipboard",
        variant: "destructive",
      })
    }
  }

  const handleShare = async (platform) => {
    if (platform) {
      let shareUrl = ""
      const title = "View my certificate"

      switch (platform) {
        case "twitter":
          shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(certificateUrl)}&text=${encodeURIComponent(title)}`
          break
        case "facebook":
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(certificateUrl)}`
          break
        case "linkedin":
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(certificateUrl)}`
          break
        default:
          break
      }

      if (shareUrl) {
        window.open(shareUrl, "_blank")
      }
    } else if (navigator.share) {
      try {
        await navigator.share({
          title: "My Certificate",
          text: "Check out my certificate!",
          url: certificateUrl,
        })
        toast({
          title: "Shared successfully",
          description: "Certificate was shared successfully",
        })
      } catch (err) {
        if (err.name !== "AbortError") {
          toast({
            title: "Share failed",
            description: "Could not share the certificate",
            variant: "destructive",
          })
        }
      }
    } else {
      toast({
        title: "Share not supported",
        description: "Web Share API is not supported in your browser",
        variant: "destructive",
      })
    }
  }

  const downloadQRCode = () => {
    const svg = document.getElementById("qr-code")
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()
    img.crossOrigin = "anonymous"

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx?.drawImage(img, 0, 0)
      const pngFile = canvas.toDataURL("image/png")

      const downloadLink = document.createElement("a")
      downloadLink.download = "certificate-qr.png"
      downloadLink.href = pngFile
      downloadLink.click()
    }

    img.src = "data:image/svg+xml;base64," + btoa(svgData)
  }

  return (
        <main className="container mx-auto p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Certificate QR Code</CardTitle>
                <CardDescription>Scan this QR code to view the certificate or download it to share.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center">
                <div className="bg-white p-4 rounded-lg">
                  <QRCode id="qr-code" value={certificateUrl} size={200} level="H" />
                </div>
                <p className="mt-4 text-sm text-muted-foreground break-all">{certificateUrl}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={downloadQRCode}>
                  <Download className="mr-2 h-4 w-4" />
                  Download QR
                </Button>
                <Button variant="outline" onClick={handleCopyLink}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Link
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Share Certificate</CardTitle>
                <CardDescription>Share your certificate on social media or directly with others.</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="social" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="social">Social Media</TabsTrigger>
                    <TabsTrigger value="direct">Direct Share</TabsTrigger>
                  </TabsList>
                  <TabsContent value="social" className="space-y-4">
                    <div className="flex flex-wrap gap-2 pt-4">
                      <Button
                        variant="outline"
                        onClick={() => handleShare("twitter")}
                        className="flex items-center gap-2"
                      >
                        <Twitter className="h-4 w-4" />
                        Twitter
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleShare("facebook")}
                        className="flex items-center gap-2"
                      >
                        <Facebook className="h-4 w-4" />
                        Facebook
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleShare("linkedin")}
                        className="flex items-center gap-2"
                      >
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="direct" className="space-y-4">
                    <div className="flex flex-col gap-4 pt-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 overflow-hidden rounded-md border p-2 py-2.5">
                          <p className="truncate text-sm">{certificateUrl}</p>
                        </div>
                        <CopyButton variant="outline" onClick={handleCopyLink} content="Content to copy" size="md" />
                      </div>
                      <Button onClick={() => handleShare()} className="flex items-center gap-2">
                        <Share2 className="h-4 w-4" />
                        Share via Device
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
  )
}
